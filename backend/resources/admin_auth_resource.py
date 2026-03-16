import os

from flask import session
from flask_smorest import Blueprint, abort
from werkzeug.security import check_password_hash

from models import User
from schemas.admin_auth_schema import AdminLoginSchema

admin_auth_bp = Blueprint(
    "admin_auth",
    __name__,
    url_prefix="/api/admin",
    description="Endpoints para autenticacion del panel administrativo",
)


def _get_admin_user_or_401():
    user_id = session.get("admin_user_id")

    if not user_id:
        abort(401, message="Sesion no valida")

    user = User.query.filter_by(id=user_id, is_admin=True).first()

    if not user:
        session.pop("admin_user_id", None)
        abort(401, message="Sesion no valida")

    return user


@admin_auth_bp.route("/login", methods=["POST"])
@admin_auth_bp.arguments(AdminLoginSchema)
def login_admin(data):
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.is_admin or not check_password_hash(user.password_hash, data["password"]):
        abort(401, message="Credenciales invalidas")

    session.clear()
    session["admin_user_id"] = user.id
    session.permanent = True

    return {
        "authenticated": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "is_admin": user.is_admin,
        },
    }


@admin_auth_bp.route("/session", methods=["GET"])
def get_admin_session():
    user = _get_admin_user_or_401()

    return {
        "authenticated": True,
        "user": {
            "id": user.id,
            "email": user.email,
            "is_admin": user.is_admin,
        },
        "panel_title": os.getenv("ADMIN_PANEL_TITLE", "Panel Administrativo"),
    }


@admin_auth_bp.route("/logout", methods=["POST"])
def logout_admin():
    session.clear()
    return {"authenticated": False}
