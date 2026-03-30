import os
from datetime import datetime
from email.message import EmailMessage
from html import escape
import smtplib

from flask_smorest import Blueprint, abort

from schemas.mail_schema import MailSchema

mail_bp = Blueprint("mail", __name__, url_prefix="/api", description="Endpoints para envio de correos")

# SMTP config
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
MAIL_SENDER = os.getenv("MAIL_SENDER", EMAIL_ADDRESS)
MAIL_RECIPIENT = os.getenv("MAIL_RECIPIENT", "haylandsebastian5@gmail.com")
BRAND_NAME = "¡Hablemos Cripto!"
BRAND_TAGLINE = "Educacion en activos digitales y mineria de Bitcoin"


def _format_message_html(message: str) -> str:
    if not message:
        return "Sin mensaje."

    return "<br>".join(escape(line) for line in message.splitlines()) or escape(message)


def _safe_value(value: str | None, fallback: str = "No especificado") -> str:
    return escape(value.strip()) if value and value.strip() else fallback


@mail_bp.route("/send-email", methods=["POST"])
@mail_bp.arguments(MailSchema)
@mail_bp.response(200, description="Correo enviado correctamente")
def send_email(data):
    """
    Enviar correo desde el formulario de contacto web
    """

    nombre = data.get("nombre")
    telefono = data.get("telefono")
    email = data.get("email")
    mensaje = data.get("mensaje") or ""

    if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
        abort(500, message="Falta configurar EMAIL_ADDRESS y EMAIL_PASSWORD en el backend.")

    current_year = datetime.now().year
    received_at = datetime.now().strftime("%d/%m/%Y %H:%M")
    nombre_safe = _safe_value(nombre)
    email_safe = _safe_value(email)
    telefono_safe = _safe_value(telefono)
    mensaje_html = _format_message_html(mensaje)
    mensaje_plain = mensaje.strip() or "Sin mensaje."

    try:
        msg = EmailMessage()
        msg["Subject"] = f"Nuevo mensaje desde Contacto | {nombre_safe}"
        msg["From"] = MAIL_SENDER
        msg["To"] = MAIL_RECIPIENT
        msg["Reply-To"] = email

        # ----------- PLAIN TEXT -----------
        msg.set_content(
            f"""
Nueva consulta recibida desde {BRAND_NAME}

Nombre: {nombre}
Telefono: {telefono}
Email: {email}
Recibido: {received_at}

Mensaje:
{mensaje_plain}

Notificacion automatica - Sitio web de {BRAND_NAME}
"""
        )

        # ----------- HTML -----------
        msg.add_alternative(
            f"""
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje desde {BRAND_NAME}</title>
</head>
<body style="margin: 0; padding: 32px 16px; background-color: #050505; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #f8fafc;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; margin: 0 auto; background: linear-gradient(180deg, #0b0b0b 0%, #050505 100%); border: 1px solid rgba(247, 147, 26, 0.22); border-radius: 24px; overflow: hidden;">
        <tr>
            <td style="padding: 40px 32px 24px; background:
                radial-gradient(circle at top left, rgba(247, 147, 26, 0.26), transparent 38%),
                radial-gradient(circle at top right, rgba(212, 175, 55, 0.18), transparent 34%),
                linear-gradient(180deg, #111111 0%, #090909 100%);
                text-align: center;
                border-bottom: 1px solid rgba(247, 147, 26, 0.14);">
                <div style="display: inline-block; padding: 8px 14px; border-radius: 999px; border: 1px solid rgba(247, 147, 26, 0.24); background-color: rgba(247, 147, 26, 0.08); color: #f7b45f; font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;">
                    Nuevo lead web
                </div>
                <h1 style="color: #ffffff; margin: 20px 0 10px; font-size: 34px; line-height: 1.1; font-weight: 800;">{BRAND_NAME}</h1>
                <p style="color: #d1d5db; margin: 0; font-size: 15px; line-height: 1.6;">{BRAND_TAGLINE}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 28px 32px 8px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0 12px;">
                    <tr>
                        <td style="padding: 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 22px 24px; border-radius: 18px; background: linear-gradient(135deg, rgba(247, 147, 26, 0.14), rgba(212, 175, 55, 0.08)); border: 1px solid rgba(247, 147, 26, 0.22);">
                                        <p style="margin: 0 0 8px; color: #f7b45f; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Formulario /contact</p>
                                        <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Nueva consulta recibida</h2>
                                        <p style="margin: 10px 0 0; color: #d1d5db; font-size: 14px; line-height: 1.6;">
                                            Alguien te escribio desde la web. Puedes responder directamente a este correo y llegara al remitente.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 32px 8px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <tr>
                        <td style="padding: 0 0 14px; color: #ffffff; font-size: 18px; font-weight: 700;">
                            Datos del contacto
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0 10px;">
                                <tr>
                                    <td width="50%" style="padding-right: 8px; vertical-align: top;">
                                        <div style="min-height: 92px; padding: 18px; border-radius: 18px; background-color: #101010; border: 1px solid rgba(255,255,255,0.06);">
                                            <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">Nombre</p>
                                            <p style="margin: 0; color: #ffffff; font-size: 17px; font-weight: 700; line-height: 1.5;">{nombre_safe}</p>
                                        </div>
                                    </td>
                                    <td width="50%" style="padding-left: 8px; vertical-align: top;">
                                        <div style="min-height: 92px; padding: 18px; border-radius: 18px; background-color: #101010; border: 1px solid rgba(255,255,255,0.06);">
                                            <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">Email</p>
                                            <p style="margin: 0; font-size: 15px; line-height: 1.6;">
                                                <a href="mailto:{email_safe}" style="color: #f7b45f; text-decoration: none;">{email_safe}</a>
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding-right: 8px; vertical-align: top;">
                                        <div style="min-height: 92px; padding: 18px; border-radius: 18px; background-color: #101010; border: 1px solid rgba(255,255,255,0.06);">
                                            <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">Telefono</p>
                                            <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6;">{telefono_safe}</p>
                                        </div>
                                    </td>
                                    <td width="50%" style="padding-left: 8px; vertical-align: top;">
                                        <div style="min-height: 92px; padding: 18px; border-radius: 18px; background-color: #101010; border: 1px solid rgba(255,255,255,0.06);">
                                            <p style="margin: 0 0 8px; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">Recibido</p>
                                            <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6;">{received_at}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 8px 32px 18px;">
                <div style="padding: 22px 24px; border-radius: 20px; background:
                    linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
                    border: 1px solid rgba(247, 147, 26, 0.14);">
                    <p style="margin: 0 0 12px; color: #f7b45f; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">Mensaje</p>
                    <div style="color: #e5e7eb; font-size: 15px; line-height: 1.8;">{mensaje_html}</div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 32px 32px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="padding: 0;">
                            <a href="mailto:{email_safe}" style="display: inline-block; padding: 14px 24px; border-radius: 999px; background: linear-gradient(90deg, #f7931a, #d4af37); color: #050505; font-size: 14px; font-weight: 800; text-decoration: none;">
                                Responder a {nombre_safe}
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px 32px 28px; border-top: 1px solid rgba(247, 147, 26, 0.12); text-align: center;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.7;">
                    Mensaje enviado desde el formulario de contacto de {BRAND_NAME}.<br>
                    &copy; {current_year} {BRAND_NAME}. Todos los derechos reservados.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
            """,
            subtype="html",
        )

        # ----------- ENVIO DEL CORREO -----------
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)

        return {"success": True, "message": "¡Gracias por tu mensaje! Te contactaremos pronto."}

    except Exception as e:
        print("Error al enviar correo:", repr(e))
        abort(500, message="No se pudo enviar el correo en este momento. Intentalo nuevamente.")
