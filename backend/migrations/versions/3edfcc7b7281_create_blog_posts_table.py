"""create blog posts table

Revision ID: 3edfcc7b7281
Revises: 951636451e40
Create Date: 2026-03-15 17:15:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3edfcc7b7281'
down_revision = '951636451e40'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'blog_posts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('author_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('slug', sa.String(length=255), nullable=False),
        sa.Column('excerpt', sa.Text(), server_default='', nullable=False),
        sa.Column('content_json', sa.JSON(), nullable=False),
        sa.Column('cover_image_path', sa.String(length=500), nullable=True),
        sa.Column('status', sa.String(length=20), server_default='draft', nullable=False),
        sa.Column('published_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.ForeignKeyConstraint(['author_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id'),
    )

    with op.batch_alter_table('blog_posts', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_blog_posts_author_id'), ['author_id'], unique=False)
        batch_op.create_index(batch_op.f('ix_blog_posts_slug'), ['slug'], unique=True)
        batch_op.create_index(batch_op.f('ix_blog_posts_status'), ['status'], unique=False)


def downgrade():
    with op.batch_alter_table('blog_posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_blog_posts_status'))
        batch_op.drop_index(batch_op.f('ix_blog_posts_slug'))
        batch_op.drop_index(batch_op.f('ix_blog_posts_author_id'))

    op.drop_table('blog_posts')
