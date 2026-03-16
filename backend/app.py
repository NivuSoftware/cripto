from datetime import timedelta
from pathlib import Path

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_smorest import Api
from resources.admin_auth_resource import admin_auth_bp
from resources.blog_resource import blog_bp
from resources.mail_resource import mail_bp
from dotenv import load_dotenv
from extensions import db, migrate
import models  # noqa: F401
from seeders.user_seeder import seed_admin_user
import os

load_dotenv()  # Cargar variables desde .env

app = Flask(__name__)
frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "change-this-secret-key")
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=12)
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = os.getenv("SESSION_COOKIE_SAMESITE", "Lax")
app.config["SESSION_COOKIE_SECURE"] = os.getenv("SESSION_COOKIE_SECURE", "false").lower() == "true"

CORS(app, supports_credentials=True, origins=[frontend_origin])

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///app.db")
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
