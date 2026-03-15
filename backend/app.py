from flask import Flask
from flask_cors import CORS
from flask_smorest import Api
from resources.mail_resource import mail_bp
from dotenv import load_dotenv
from extensions import db, migrate
import models  # noqa: F401
from seeders.user_seeder import seed_admin_user
import os

load_dotenv()  # Cargar variables desde .env

app = Flask(__name__)
CORS(app)

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


@app.cli.command("seed-admin")
def seed_admin() -> None:
    print(seed_admin_user())

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
