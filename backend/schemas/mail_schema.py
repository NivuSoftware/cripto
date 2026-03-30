from marshmallow import Schema, fields

class MailSchema(Schema):
    nombre = fields.String(required=True)
    telefono = fields.String(required=True)
    email = fields.Email(required=True)
    mensaje = fields.String(required=True)
