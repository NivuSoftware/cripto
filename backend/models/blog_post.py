from extensions import db


class BlogPost(db.Model):
    __tablename__ = "blog_posts"

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), nullable=False, unique=True, index=True)
    excerpt = db.Column(db.Text, nullable=False, default="", server_default="")
    content_json = db.Column(db.JSON, nullable=False, default=dict)
    cover_image_path = db.Column(db.String(500), nullable=True)
    status = db.Column(db.String(20), nullable=False, default="draft", server_default="draft", index=True)
    published_at = db.Column(db.DateTime(timezone=True), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    author = db.relationship("User", backref=db.backref("blog_posts", lazy="dynamic"))
