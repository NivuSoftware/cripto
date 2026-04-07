import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { PageSeo } from '../components/PageSeo';
import { absoluteUrl, createBreadcrumbSchema } from '../lib/site';
import { BlogRichEditor } from '../components/blog/BlogRichEditor';
import { blogPublicService } from '../services/blogPublicService';
import type { BlogPost as BlogPostType } from '../types/blog';

const EMPTY_CONTENT = { type: 'doc', content: [] } as Record<string, unknown>;

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await blogPublicService.getBySlug(slug);
        setPost(response);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black px-4 pb-16 pt-28 text-white">
        <PageSeo
          title="Cargando artículo"
          description="Cargando artículo del blog sobre Bitcoin, minería y criptomonedas."
          path={slug ? `/blog/${slug}` : '/blog'}
          noindex
        />
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 px-6 py-16 text-center text-gray-300">
          Cargando artículo...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black px-4 pb-16 pt-28 text-white">
        <PageSeo
          title="Artículo no encontrado"
          description="El artículo que buscas no está disponible."
          path={slug ? `/blog/${slug}` : '/blog'}
          noindex
        />
        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 px-6 py-16 text-center">
          <h1 className="text-3xl font-bold">Artículo no encontrado</h1>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-[#f7b45f]">
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-20 pt-24 text-white">
      <PageSeo
        title={post.title}
        description={post.excerpt || `Lee el artículo ${post.title} en el blog de ¡Hablemos Cripto!`}
        path={`/blog/${post.slug}`}
        image={post.cover_image_url ?? '/images/reveal.jpg'}
        type="article"
        publishedTime={post.published_at}
        modifiedTime={post.updated_at}
        keywords={[
          'bitcoin',
          'mineria de bitcoin',
          'blog cripto',
          post.title,
          post.slug.replace(/-/g, ' '),
        ]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: absoluteUrl(`/blog/${post.slug}`),
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            image: [absoluteUrl(post.cover_image_url ?? '/images/reveal.jpg')],
            datePublished: post.published_at,
            dateModified: post.updated_at ?? post.published_at,
            author: {
              '@type': 'Organization',
              name: '¡Hablemos Cripto!',
            },
            publisher: {
              '@type': 'Organization',
              name: '¡Hablemos Cripto!',
              logo: {
                '@type': 'ImageObject',
                url: absoluteUrl('/images/logo.png'),
              },
            },
            inLanguage: 'es',
          },
          createBreadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-[#f7b45f]">
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>

          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#f7931a]">
              <CalendarDays className="h-4 w-4" />
              {post.published_at ? new Date(post.published_at).toLocaleString() : 'Sin fecha de publicación'}
            </div>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">{post.excerpt}</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 sm:p-8">
            <BlogRichEditor content={post.content_json ?? EMPTY_CONTENT} editable={false} />
          </div>
        </div>
      </article>
    </div>
  );
}
