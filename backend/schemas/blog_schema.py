from marshmallow import Schema, fields, validate


class BlogPostWriteSchema(Schema):
    title = fields.String(required=True, validate=validate.Length(min=3, max=255))
    slug = fields.String(required=True, validate=validate.Length(min=3, max=255))
    excerpt = fields.String(load_default="")
    content_json = fields.Raw(load_default={"type": "doc", "content": []})
    cover_image_path = fields.String(allow_none=True, load_default=None)
    status = fields.String(load_default="draft", validate=validate.OneOf(["draft", "published"]))
    published_at = fields.DateTime(allow_none=True, load_default=None)


class BlogImageDeleteSchema(Schema):
    path = fields.String(required=True)
