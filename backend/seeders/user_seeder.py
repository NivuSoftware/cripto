from werkzeug.security import check_password_hash, generate_password_hash

from extensions import db
from models import User

ADMIN_EMAIL = "admin@hablemoscripto.com"
ADMIN_PASSWORD = "H4bl3mosCPRT26"


def seed_admin_user() -> str:
    admin_user = User.query.filter_by(email=ADMIN_EMAIL).first()

    if admin_user:
        admin_user.is_admin = True
        if not check_password_hash(admin_user.password_hash, ADMIN_PASSWORD):
            admin_user.password_hash = generate_password_hash(ADMIN_PASSWORD)
        db.session.commit()
        return "Admin user already exists. Admin credentials ensured."

    new_admin = User(
        email=ADMIN_EMAIL,
        password_hash=generate_password_hash(ADMIN_PASSWORD),
        is_admin=True,
    )
    db.session.add(new_admin)
    db.session.commit()
    return "Admin user created successfully."
