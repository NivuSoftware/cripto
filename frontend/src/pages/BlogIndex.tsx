import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { absoluteUrl, createBreadcrumbSchema } from '../lib/site';
import { blogPublicService } from '../services/blogPublicService';
import type { BlogPost } from '../types/blog';

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await blogPublicService.list();
        setPosts(response.items);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black pb-16 pt-24 text-white">
      <PageSeo
        title="Blog de Bitcoin, minería y noticias cripto"
        description="Lee artículos sobre Bitcoin, minería de Bitcoin, educación cripto y análisis del mercado para mejorar tu criterio y mantenerte al día."
        path="/blog"
        keywords={[
          'blog bitcoin',
          'noticias bitcoin',
          'mineria de bitcoin',
          'analisis cripto',
          'educacion cripto',
        ]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog | ¡Hablemos Cripto!',
            description:
              'Colección de artículos sobre Bitcoin, minería de Bitcoin, educación cripto y noticias del mercado.',
            url: absoluteUrl('/blog'),
            inLanguage: 'es',
          },
          ...(posts.length > 0
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'ItemList',
                  name: 'Artículos del blog',
                  itemListElement: posts.map((post, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    url: absoluteUrl(`/blog/${post.slug}`),
                    name: post.title,
                  })),
                } as Record<string, unknown>,
              ]
            : []),
          createBreadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
        ]}
      />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7931a]/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#f7931a]">Blog</p>
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Noticias, educación y análisis de Bitcoin
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Publicaciones recientes del equipo para compartir ideas, novedades y oportunidades del ecosistema.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-16 text-center text-gray-300">
            Cargando publicaciones...
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold text-white">Aún no hay publicaciones</h2>
            <p className="mt-3 text-gray-400">El blog estará disponible en cuanto publiquemos el primer post.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] transition hover:border-[#f7931a]/30 hover:shadow-[0_0_40px_rgba(247,147,26,0.08)]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-gray-500">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#f7931a]">
                    <CalendarDays className="h-4 w-4" />
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Borrador'}
                  </div>

                  <h2 className="text-2xl font-semibold text-white transition group-hover:text-[#f7b45f]">
                    {post.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-300">
                    {post.excerpt || 'Sin extracto.'}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f7b45f]">
                    Leer artículo
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
