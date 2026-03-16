import { useEffect, useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Globe2, ImagePlus, Rocket, Save, Trash2, Undo2 } from 'lucide-react';
import { BlogRichEditor } from '../components/blog/BlogRichEditor';
import { blogAdminService } from '../services/blogAdminService';
import { resolveAssetUrl } from '../services/http';
import { blogUploadService } from '../services/blogUploadService';
import type { BlogPostWritePayload } from '../types/blog';

const EMPTY_CONTENT = { type: 'doc', content: [] } as Record<string, unknown>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 255);
}

export default function AdminBlogEditor() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const numericPostId = Number(postId);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [hasTouchedSlug, setHasTouchedSlug] = useState(false);
  const [form, setForm] = useState<BlogPostWritePayload>({
    title: '',
    slug: '',
    excerpt: '',
    content_json: EMPTY_CONTENT,
    cover_image_path: null,
    status: 'draft',
    published_at: null,
  });

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      setError('');
      setNotice('');

      try {
        const post = await blogAdminService.getById(numericPostId);
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content_json: post.content_json ?? EMPTY_CONTENT,
          cover_image_path: post.cover_image_path,
          status: post.status,
          published_at: post.published_at,
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el post');
      } finally {
        setIsLoading(false);
      }
    };

    if (!Number.isNaN(numericPostId)) {
      void loadPost();
    }
  }, [numericPostId]);

  const updateField = <K extends keyof BlogPostWritePayload>(key: K, value: BlogPostWritePayload[K]) => {
    setForm((currentForm) => ({ ...currentForm, [key]: value }));
  };

  const handleTitleChange = (value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      title: value,
      slug: hasTouchedSlug ? currentForm.slug : slugify(value),
    }));
  };

  const persistPost = async (mode: 'save' | 'publish' | 'unpublish') => {
    setIsSaving(true);
    setError('');
    setNotice('');

    try {
      const payload: BlogPostWritePayload = {
        ...form,
        status:
          mode === 'publish'
            ? 'published'
            : mode === 'unpublish'
              ? 'draft'
              : form.status,
        published_at:
          mode === 'publish'
            ? form.published_at ?? new Date().toISOString()
            : mode === 'unpublish'
              ? null
              : form.status === 'published'
                ? form.published_at ?? new Date().toISOString()
                : null,
      };

      const updated = await blogAdminService.update(numericPostId, payload);
      setForm({
        title: updated.title,
        slug: updated.slug,
        excerpt: updated.excerpt,
        content_json: updated.content_json ?? EMPTY_CONTENT,
        cover_image_path: updated.cover_image_path,
        status: updated.status,
        published_at: updated.published_at,
      });
      setNotice(
        mode === 'publish'
          ? 'Post publicado correctamente.'
          : mode === 'unpublish'
            ? 'El post volvio a borrador.'
            : updated.status === 'published'
              ? 'Cambios publicados guardados.'
              : 'Borrador guardado correctamente.',
      );
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'No se pudo guardar el post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Esto eliminara el post completo y todas sus imagenes. ¿Deseas continuar?');

    if (!confirmed) {
      return;
    }

    await blogAdminService.remove(numericPostId);
    navigate('/admin/blog', { replace: true });
  };

  const handleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsUploadingCover(true);
    setError('');
    setNotice('');

    try {
      const upload = await blogUploadService.uploadCover(numericPostId, file);
      updateField('cover_image_path', upload.path);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'No se pudo subir la portada');
    } finally {
      setIsUploadingCover(false);
      event.target.value = '';
    }
  };

  const handleCoverDelete = async () => {
    await blogUploadService.deleteCover(numericPostId);
    updateField('cover_image_path', null);
  };

  if (isLoading) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-14 text-center text-sm text-gray-300">
        Cargando editor...
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[32px] border border-[#f7931a]/15 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to="/admin/blog"
              className="mb-4 inline-flex items-center gap-2 text-sm text-[#f7b45f] transition hover:text-[#ffd48e]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al listado
            </Link>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Editor del post</h2>
            <p className="mt-2 text-sm text-gray-300">
              Gestiona portada, contenido enriquecido, alineaciones, enlaces e imagenes internas.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`/blog/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition hover:border-white/20"
            >
              <Globe2 className="h-4 w-4" />
              Ver publico
            </a>
            <button
              type="button"
              onClick={() => {
                void persistPost('save');
              }}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#f7931a] to-[#d4af37] px-5 py-3 font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Guardando...' : form.status === 'published' ? 'Guardar cambios' : 'Guardar borrador'}
            </button>
            {form.status === 'draft' ? (
              <button
                type="button"
                onClick={() => {
                  void persistPost('publish');
                }}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-200 transition hover:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Rocket className="h-4 w-4" />
                Publicar ahora
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  void persistPost('unpublish');
                }}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-gray-200 transition hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Undo2 className="h-4 w-4" />
                Volver a borrador
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
        {notice && (
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {notice}
          </div>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-[#f7931a]/15 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <div className="grid gap-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  <span>Titulo</span>
                  <input
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#f7931a]"
                    placeholder="Escribe un titulo potente"
                  />
                </label>

                <label className="space-y-2 text-sm text-gray-300">
                  <span>Slug</span>
                  <input
                    value={form.slug}
                    onChange={(event) => {
                      setHasTouchedSlug(true);
                      updateField('slug', slugify(event.target.value));
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#f7931a]"
                    placeholder="mi-post-del-blog"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-gray-300">
                <span>Extracto</span>
                <textarea
                  rows={4}
                  value={form.excerpt}
                  onChange={(event) => updateField('excerpt', event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#f7931a]"
                  placeholder="Resumen corto para tarjetas y listados"
                />
              </label>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#f7931a]/15 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Contenido del post</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Editor enriquecido con negrita, italica, alineaciones, enlaces e imagenes flexibles.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[#f7931a]/80">
                  Selecciona una imagen para cambiar ancho y alinear texto a su lado.
                </p>
              </div>
            </div>

            <BlogRichEditor
              content={form.content_json}
              onChange={(content) => updateField('content_json', content)}
              onUploadImage={async (file) => blogUploadService.uploadContentImage(numericPostId, file)}
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-[#f7931a]/15 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <h3 className="text-lg font-semibold text-white">Publicacion</h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Estado actual</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {form.status === 'published' ? 'Publicado' : 'Borrador'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Fecha de publicacion</p>
                <p className="mt-2 text-sm text-gray-200">
                  {form.published_at ? new Date(form.published_at).toLocaleString() : 'Se asignara automaticamente al publicar'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#f7931a]/15 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Portada</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Se guarda en el backend dentro de la carpeta del post.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/60 aspect-[4/3]">
              {form.cover_image_path ? (
                <img
                  src={resolveAssetUrl(form.cover_image_path) ?? undefined}
                  alt="Portada del post"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-8 text-center text-sm text-gray-500">
                  Aun no hay portada. Sube una imagen destacada para el post.
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#f7931a]/25 bg-[#f7931a]/10 px-4 py-3 text-sm font-semibold text-[#f7b45f] transition hover:border-[#f7931a]">
                <ImagePlus className="h-4 w-4" />
                {isUploadingCover ? 'Subiendo...' : 'Subir portada'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    void handleCoverUpload(event);
                  }}
                />
              </label>

              {form.cover_image_path && (
                <button
                  type="button"
                  onClick={() => {
                    void handleCoverDelete();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Quitar portada
                </button>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-red-500/15 bg-red-500/5 p-5 backdrop-blur-xl sm:p-6">
            <h3 className="text-lg font-semibold text-white">Zona critica</h3>
            <p className="mt-2 text-sm text-gray-300">
              Al eliminar este post tambien se eliminan sus imagenes de portada y contenido.
            </p>
            <button
              type="button"
              onClick={() => {
                void handleDelete();
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar post
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
