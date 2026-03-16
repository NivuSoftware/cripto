from datetime import datetime, timezone

from flask import request
from flask_smorest import Blueprint, abort
from sqlalchemy import or_

from extensions import db
from models import BlogPost
from schemas.blog_schema import BlogImageDeleteSchema, BlogPostWriteSchema
from services.blog_storage import (
    cleanup_unused_content_images,
    content_image_belongs_to_post,
    cover_image_belongs_to_post,
    delete_post_directory,
    delete_public_file,
    extract_all_upload_paths,
    extract_content_image_paths,
    path_exists,
    save_content_image,
    save_cover_image,
)
from utils.admin_auth import require_admin_user

blog_bp = Blueprint("blog", __name__, url_prefix="/api", description="Endpoints para blog")


def _slugify(value: str) -> str:
    normalized = "".join(char.lower() if char.isalnum() else "-" for char in value.strip())
    parts = [part for part in normalized.split("-") if part]
    slug = "-".join(parts)
    return slug[:255]


def _serialize_blog_post(post: BlogPost, include_content: bool = True) -> dict:
    cover_image_url = None

    if post.cover_image_path:
        cover_image_url = f"{request.url_root.rstrip('/')}{post.cover_image_path}"

    payload = {
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "cover_image_path": post.cover_image_path,
        "cover_image_url": cover_image_url,
        "status": post.status,
        "published_at": post.published_at.isoformat() if post.published_at else None,
        "created_at": post.created_at.isoformat() if post.created_at else None,
        "updated_at": post.updated_at.isoformat() if post.updated_at else None,
        "author": {
            "id": post.author.id,
            "email": post.author.email,
        } if post.author else None,
    }

    if include_content:
        payload["content_json"] = post.content_json

    return payload


def _validate_slug_uniqueness(slug: str, current_post_id: int | None = None) -> None:
    existing = BlogPost.query.filter_by(slug=slug).first()

    if existing and existing.id != current_post_id:
        abort(400, message="Ya existe un post con ese slug")


def _normalize_post_payload(data: dict, current_post: BlogPost | None = None) -> dict:
    title = data["title"].strip()
    slug = _slugify(data["slug"])

    if not title:
        abort(400, message="El titulo es obligatorio")

    if len(slug) < 3:
        abort(400, message="El slug es invalido")

    _validate_slug_uniqueness(slug, current_post.id if current_post else None)

    cover_image_path = data.get("cover_image_path")
    if cover_image_path and not path_exists(cover_image_path):
        abort(400, message="La imagen de portada no existe")

    if current_post and cover_image_path and not cover_image_belongs_to_post(current_post.id, cover_image_path):
        abort(400, message="La portada no pertenece al post")

    content_json = data.get("content_json") or {"type": "doc", "content": []}
    if not isinstance(content_json, dict):
        abort(400, message="El contenido del post es invalido")

    if current_post:
        upload_paths = extract_all_upload_paths(content_json)
        invalid_paths = [
            path for path in upload_paths if not content_image_belongs_to_post(current_post.id, path)
        ]
        if invalid_paths:
            abort(400, message="El contenido contiene imagenes que no pertenecen a este post")

    return {
        "title": title,
        "slug": slug,
        "excerpt": data.get("excerpt", "").strip(),
        "content_json": content_json,
        "cover_image_path": cover_image_path,
        "status": data.get("status", "draft"),
        "published_at": data.get("published_at"),
    }


def _apply_post_payload(post: BlogPost, data: dict) -> None:
    old_cover = post.cover_image_path

    post.title = data["title"]
    post.slug = data["slug"]
    post.excerpt = data["excerpt"]
    post.content_json = data["content_json"]
    post.cover_image_path = data["cover_image_path"]
    post.status = data["status"]

    if post.status == "published":
        post.published_at = data["published_at"] or post.published_at or datetime.now(timezone.utc)
    else:
        post.published_at = data["published_at"]

    if old_cover and old_cover != post.cover_image_path:
        delete_public_file(old_cover)

    referenced_paths = extract_content_image_paths(post.content_json, post.id)
    cleanup_unused_content_images(post.id, referenced_paths)


def _get_post_or_404(post_id: int) -> BlogPost:
    post = BlogPost.query.get(post_id)

    if not post:
        abort(404, message="Post no encontrado")

    return post


@blog_bp.route("/admin/blog-posts", methods=["GET"])
def list_admin_blog_posts():
    require_admin_user()

    query = BlogPost.query.order_by(BlogPost.updated_at.desc())

    status = request.args.get("status")
    search = (request.args.get("q") or "").strip()

    if status in {"draft", "published"}:
        query = query.filter(BlogPost.status == status)

    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                BlogPost.title.ilike(search_pattern),
                BlogPost.slug.ilike(search_pattern),
                BlogPost.excerpt.ilike(search_pattern),
            )
        )

    items = [_serialize_blog_post(post, include_content=False) for post in query.all()]
    return {"items": items}


@blog_bp.route("/admin/blog-posts", methods=["POST"])
@blog_bp.arguments(BlogPostWriteSchema)
def create_blog_post(data):
    admin_user = require_admin_user()
    normalized = _normalize_post_payload(data)

    post = BlogPost(
        author_id=admin_user.id,
        title=normalized["title"],
        slug=normalized["slug"],
        excerpt=normalized["excerpt"],
        content_json=normalized["content_json"],
        cover_image_path=normalized["cover_image_path"],
        status=normalized["status"],
        published_at=normalized["published_at"],
    )

    db.session.add(post)
    db.session.flush()

    if post.cover_image_path and not cover_image_belongs_to_post(post.id, post.cover_image_path):
        abort(400, message="La portada no pertenece al post")

    _apply_post_payload(post, normalized)
    db.session.commit()

    return _serialize_blog_post(post)


@blog_bp.route("/admin/blog-posts/<int:post_id>", methods=["GET"])
def get_admin_blog_post(post_id: int):
    require_admin_user()
    post = _get_post_or_404(post_id)
    return _serialize_blog_post(post)


@blog_bp.route("/admin/blog-posts/<int:post_id>", methods=["PUT"])
@blog_bp.arguments(BlogPostWriteSchema)
def update_blog_post(data, post_id: int):
    require_admin_user()
    post = _get_post_or_404(post_id)
    normalized = _normalize_post_payload(data, current_post=post)

    _apply_post_payload(post, normalized)
    db.session.commit()

    return _serialize_blog_post(post)


@blog_bp.route("/admin/blog-posts/<int:post_id>", methods=["DELETE"])
def delete_blog_post(post_id: int):
    require_admin_user()
    post = _get_post_or_404(post_id)

    db.session.delete(post)
    db.session.commit()
    delete_post_directory(post_id)

    return {"success": True}


@blog_bp.route("/admin/blog-posts/<int:post_id>/cover", methods=["POST"])
def upload_blog_cover(post_id: int):
    require_admin_user()
    post = _get_post_or_404(post_id)

    file = request.files.get("file")
    if not file:
        abort(400, message="Debes enviar una imagen")

    cover_image_path = save_cover_image(post.id, file)

    if post.cover_image_path and post.cover_image_path != cover_image_path:
        delete_public_file(post.cover_image_path)

    post.cover_image_path = cover_image_path
    db.session.commit()

    return {"path": cover_image_path, "url": f"{request.url_root.rstrip('/')}{cover_image_path}"}


@blog_bp.route("/admin/blog-posts/<int:post_id>/cover", methods=["DELETE"])
def delete_blog_cover(post_id: int):
    require_admin_user()
    post = _get_post_or_404(post_id)

    if post.cover_image_path:
        delete_public_file(post.cover_image_path)
        post.cover_image_path = None
        db.session.commit()

    return {"success": True}


@blog_bp.route("/admin/blog-posts/<int:post_id>/images", methods=["POST"])
def upload_blog_content_image(post_id: int):
    require_admin_user()
    _get_post_or_404(post_id)

    file = request.files.get("file")
    if not file:
        abort(400, message="Debes enviar una imagen")

    image_path = save_content_image(post_id, file)
    return {"path": image_path, "url": f"{request.url_root.rstrip('/')}{image_path}"}


@blog_bp.route("/admin/blog-posts/<int:post_id>/images", methods=["DELETE"])
@blog_bp.arguments(BlogImageDeleteSchema)
def delete_blog_content_image(data, post_id: int):
    require_admin_user()
    _get_post_or_404(post_id)

    image_path = data["path"]

    if not content_image_belongs_to_post(post_id, image_path):
        abort(400, message="La imagen no pertenece al post")

    delete_public_file(image_path)
    return {"success": True}


@blog_bp.route("/blog-posts", methods=["GET"])
def list_public_blog_posts():
    posts = (
        BlogPost.query.filter(BlogPost.status == "published")
        .order_by(BlogPost.published_at.desc(), BlogPost.created_at.desc())
        .all()
    )

    return {"items": [_serialize_blog_post(post, include_content=False) for post in posts]}


@blog_bp.route("/blog-posts/<string:slug>", methods=["GET"])
def get_public_blog_post(slug: str):
    post = BlogPost.query.filter_by(slug=slug, status="published").first()

    if not post:
        abort(404, message="Post no encontrado")

    return _serialize_blog_post(post)
