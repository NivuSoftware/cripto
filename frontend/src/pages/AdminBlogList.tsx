import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, PencilLine, Plus, Search, Trash2 } from 'lucide-react';
import { blogAdminService } from '../services/blogAdminService';
import type { BlogPost, BlogPostStatus } from '../types/blog';

const EMPTY_CONTENT = { type: 'doc', content: [] } as Record<string, unknown>;

export default function AdminBlogList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | BlogPostStatus>('all');

  const loadPosts = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await blogAdminService.list({
        q: search || undefined,
        status: status === 'all' ? undefined : status,
      });
      setPosts(response.items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar el listado del blog');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, [status]);

  const handleCreatePost = async () => {
    setIsCreating(true);
    setError('');

    try {
      const newPost = await blogAdminService.create({
        title: 'Nuevo post',
        slug: `nuevo-post-${Date.now()}`,
        excerpt: '',
        content_json: EMPTY_CONTENT,
        cover_image_path: null,
        status: 'draft',
        published_at: null,
      });

      navigate(`/admin/blog/${newPost.id}`);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'No se pudo crear el nuevo post');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    const confirmed = window.confirm('Esto eliminara el post y sus imagenes. ¿Deseas continuar?');

    if (!confirmed) {
      return;
    }

    await blogAdminService.remove(postId);
    await loadPosts();
  };

  return (
    <section className="rounded-[32px] border border-[#f7931a]/15 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-[#f7931a]">CRUD visual</p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Posts del blog</h2>
          <p className="mt-2 text-sm text-gray-300">
            Crea, edita, publica o elimina contenido con control total sobre portada e imagenes internas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            void handleCreatePost();
          }}
          disabled={isCreating}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f7931a] to-[#d4af37] px-5 py-3 font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {isCreating ? 'Creando...' : 'Nuevo post'}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_180px_140px]">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-gray-300">
          <Search className="h-4 w-4 text-[#f7931a]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void loadPosts();
              }
            }}
            placeholder="Buscar por titulo, slug o extracto"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as 'all' | BlogPostStatus)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="all">Todos los estados</option>
          <option value="draft">Borradores</option>
          <option value="published">Publicados</option>
        </select>

        <button
          type="button"
          onClick={() => {
            void loadPosts();
          }}
          className="rounded-2xl border border-[#f7931a]/25 bg-[#f7931a]/10 px-4 py-3 text-sm font-semibold text-[#f7b45f] transition hover:border-[#f7931a]"
        >
          Aplicar filtros
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-[28px] border border-white/10 bg-white/5 px-6 py-14 text-center text-sm text-gray-300">
          Cargando posts...
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 px-6 py-14 text-center">
          <p className="text-lg font-semibold text-white">Aun no hay posts en el blog</p>
          <p className="mt-2 text-sm text-gray-400">
            Crea el primer borrador desde este panel y empieza a publicar contenido.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="grid gap-5 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-5 lg:grid-cols-[180px_minmax(0,1fr)_auto] lg:items-center"
            >
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/60 aspect-[4/3]">
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.25em] text-gray-500">
                    Sin portada
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                      post.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>

                  <span className="flex items-center gap-2 text-xs text-gray-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.published_at ? new Date(post.published_at).toLocaleString() : 'Sin publicar'}
                  </span>
                </div>

                <h3 className="truncate text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-400">/{post.slug}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-300">
                  {post.excerpt || 'Sin extracto todavia.'}
                </p>
              </div>

              <div className="flex gap-2 lg:flex-col">
                <Link
                  to={`/admin/blog/${post.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#f7931a]/25 bg-[#f7931a]/10 px-4 py-3 text-sm font-semibold text-[#f7b45f] transition hover:border-[#f7931a]"
                >
                  <PencilLine className="h-4 w-4" />
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    void handleDeletePost(post.id);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
