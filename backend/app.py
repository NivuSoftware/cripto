from datetime import timedelta
from pathlib import Path
from urllib.parse import urlparse, urlunparse

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_smorest import Api
from werkzeug.middleware.proxy_fix import ProxyFix
from resources.admin_auth_resource import admin_auth_bp
from resources.blog_resource import blog_bp
from resources.mail_resource import mail_bp
from dotenv import load_dotenv
from extensions import db, migrate
import models  # noqa: F401
from seeders.user_seeder import seed_admin_user
import os

load_dotenv()  # Cargar variables desde .env


def _running_inside_docker() -> bool:
    return Path("/.dockerenv").exists()


def _resolve_database_url() -> str:
    database_url = os.getenv("DATABASE_URL", "sqlite:///app.db")
    parsed_url = urlparse(database_url)

    if parsed_url.hostname != "postgres" or _running_inside_docker():
        return database_url

    host_port = parsed_url.netloc.rsplit("@", 1)[-1]
    if host_port == "postgres":
        normalized_host_port = "localhost"
    elif host_port.startswith("postgres:"):
        normalized_host_port = f"localhost:{host_port.split(':', 1)[1]}"
    else:
        return database_url

    credentials = ""
    if "@" in parsed_url.netloc:
        credentials = f"{parsed_url.netloc.rsplit('@', 1)[0]}@"

    return urlunparse(parsed_url._replace(netloc=f"{credentials}{normalized_host_port}"))


app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "change-this-secret-key")
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=12)
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = os.getenv("SESSION_COOKIE_SAMESITE", "Lax")
app.config["SESSION_COOKIE_SECURE"] = os.getenv("SESSION_COOKIE_SECURE", "false").lower() == "true"

CORS(app, supports_credentials=True, origins=[frontend_origin])

app.config["SQLALCHEMY_DATABASE_URI"] = _resolve_database_url()
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Configuración de Swagger
app.config["API_TITLE"] = "VidaBuena API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

db.init_app(app)
migrate.init_app(app, db)

# Inicializar API
api = Api(app)

# Registrar blueprint
api.register_blueprint(mail_bp)
api.register_blueprint(admin_auth_bp)
api.register_blueprint(blog_bp)


@app.get("/uploads/<path:filename>")
def uploaded_file(filename: str):
    uploads_root = Path(app.root_path) / "uploads"
    return send_from_directory(uploads_root, filename)


@app.cli.command("seed-admin")
def seed_admin() -> None:
    print(seed_admin_user())

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
