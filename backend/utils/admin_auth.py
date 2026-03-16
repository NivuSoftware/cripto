from flask import session
from flask_smorest import abort

from models import User


def require_admin_user() -> User:
    user_id = session.get("admin_user_id")

    if not user_id:
        abort(401, message="Sesion no valida")

    user = User.query.filter_by(id=user_id, is_admin=True).first()

    if not user:
        session.pop("admin_user_id", None)
        abort(401, message="Sesion no valida")

    return user
