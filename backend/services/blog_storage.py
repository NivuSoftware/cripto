import shutil
import uuid
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse

from flask import current_app
from flask_smorest import abort
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def get_uploads_root() -> Path:
    return Path(current_app.root_path) / "uploads"


def get_post_root(post_id: int) -> Path:
    return get_uploads_root() / "blog" / str(post_id)


def get_cover_dir(post_id: int) -> Path:
    return get_post_root(post_id) / "cover"


def get_content_dir(post_id: int) -> Path:
    return get_post_root(post_id) / "content"


def ensure_post_directories(post_id: int) -> None:
    get_cover_dir(post_id).mkdir(parents=True, exist_ok=True)
    get_content_dir(post_id).mkdir(parents=True, exist_ok=True)


def _validate_image(file: FileStorage) -> str:
    filename = secure_filename(file.filename or "")

    if not filename:
        abort(400, message="Archivo invalido")

    extension = Path(filename).suffix.lower()

    if extension not in ALLOWED_IMAGE_EXTENSIONS:
        abort(400, message="Formato de imagen no permitido")

    if file.mimetype and not file.mimetype.startswith("image/"):
        abort(400, message="El archivo debe ser una imagen")

    return filename


def _public_path_from_absolute_path(path: Path) -> str:
    relative_path = path.relative_to(get_uploads_root()).as_posix()
    return f"/uploads/{relative_path}"


def _remove_file_if_exists(path: Path) -> None:
    if path.exists() and path.is_file():
        path.unlink()


def _remove_empty_directories(path: Path, stop_at: Path) -> None:
    current = path

    while current != stop_at and current.exists():
        try:
            current.rmdir()
        except OSError:
            break
        current = current.parent


def save_cover_image(post_id: int, file: FileStorage) -> str:
    ensure_post_directories(post_id)
    cover_dir = get_cover_dir(post_id)
    clear_directory(cover_dir)

    filename = _validate_image(file)
    extension = Path(filename).suffix.lower()
    stored_name = f"cover-{uuid.uuid4().hex}{extension}"
    target_path = cover_dir / stored_name
    file.save(target_path)

    return _public_path_from_absolute_path(target_path)


def save_content_image(post_id: int, file: FileStorage) -> str:
    ensure_post_directories(post_id)
    content_dir = get_content_dir(post_id)

    filename = _validate_image(file)
    basename = Path(filename).stem[:48] or "image"
    extension = Path(filename).suffix.lower()
    stored_name = f"{secure_filename(basename)}-{uuid.uuid4().hex}{extension}"
    target_path = content_dir / stored_name
    file.save(target_path)

    return _public_path_from_absolute_path(target_path)


def delete_public_file(public_path: Optional[str]) -> None:
    if not public_path or not public_path.startswith("/uploads/"):
        return

    absolute_path = get_uploads_root() / public_path.removeprefix("/uploads/")
    _remove_file_if_exists(absolute_path)
    _remove_empty_directories(absolute_path.parent, get_uploads_root())


def clear_directory(path: Path) -> None:
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)
        return

    for item in path.iterdir():
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()


def delete_post_directory(post_id: int) -> None:
    post_root = get_post_root(post_id)

    if post_root.exists():
        shutil.rmtree(post_root)


def extract_content_image_paths(content_json: object, post_id: int) -> set[str]:
    prefix = f"/uploads/blog/{post_id}/content/"
    paths: set[str] = set()

    def walk(node: object) -> None:
        if isinstance(node, dict):
            attributes = node.get("attrs")
            if isinstance(attributes, dict):
                src = attributes.get("src")
                if isinstance(src, str):
                    normalized_path = normalize_upload_path(src)
                    if normalized_path:
                        if normalized_path.startswith(prefix):
                            paths.add(normalized_path)
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(content_json)
    return paths


def cleanup_unused_content_images(post_id: int, referenced_paths: set[str]) -> None:
    content_dir = get_content_dir(post_id)

    if not content_dir.exists():
        return

    for file_path in content_dir.iterdir():
        if not file_path.is_file():
            continue

        public_path = _public_path_from_absolute_path(file_path)
        if public_path not in referenced_paths:
            file_path.unlink()


def path_exists(public_path: Optional[str]) -> bool:
    if not public_path or not public_path.startswith("/uploads/"):
        return False

    absolute_path = get_uploads_root() / public_path.removeprefix("/uploads/")
    return absolute_path.exists()


def content_image_belongs_to_post(post_id: int, public_path: str) -> bool:
    return public_path.startswith(f"/uploads/blog/{post_id}/content/")


def cover_image_belongs_to_post(post_id: int, public_path: str) -> bool:
    return public_path.startswith(f"/uploads/blog/{post_id}/cover/")


def normalize_upload_path(path: str) -> Optional[str]:
    if path.startswith("/uploads/"):
        return path

    parsed = urlparse(path)
    if parsed.path.startswith("/uploads/"):
        return parsed.path

    return None


def extract_all_upload_paths(content_json: object) -> set[str]:
    paths: set[str] = set()

    def walk(node: object) -> None:
        if isinstance(node, dict):
            attributes = node.get("attrs")
            if isinstance(attributes, dict):
                src = attributes.get("src")
                if isinstance(src, str):
                    normalized_path = normalize_upload_path(src)
                    if normalized_path:
                        paths.add(normalized_path)
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(content_json)
    return paths
