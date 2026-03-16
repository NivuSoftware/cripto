import { CalendarDays, Eye } from 'lucide-react';
import { BlogRichEditor } from './BlogRichEditor';
import { resolveAssetUrl } from '../../services/http';

interface BlogPostPreviewProps {
  title: string;
  excerpt: string;
  coverImagePath: string | null;
  content: Record<string, unknown>;
  publishedAt: string | null;
  status: 'draft' | 'published';
}

const EMPTY_CONTENT = { type: 'doc', content: [] } as Record<string, unknown>;

export function BlogPostPreview({
  title,
  excerpt,
  coverImagePath,
  content,
  publishedAt,
  status,
}: BlogPostPreviewProps) {
  return (
    <section className="rounded-[32px] border border-[#f7931a]/15 bg-black/55 p-5 backdrop-blur-xl sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7931a]/10 text-[#f7931a]">
          <Eye className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#f7931a]">Vista previa</p>
          <p className="mt-1 text-sm text-gray-400">Asi se va viendo el articulo mientras editas.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#f7931a]">
            <CalendarDays className="h-4 w-4" />
            {publishedAt ? new Date(publishedAt).toLocaleString() : status === 'draft' ? 'Borrador en progreso' : 'Fecha pendiente'}
          </div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            {title || 'Titulo del post'}
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-300">
            {excerpt || 'El extracto aparecera aqui para que puedas comprobar la jerarquia visual del encabezado.'}
          </p>
        </div>

        {coverImagePath && (
          <div className="border-b border-white/10">
            <img
              src={resolveAssetUrl(coverImagePath) ?? undefined}
              alt={title || 'Portada'}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-5 sm:p-6">
          <BlogRichEditor content={content || EMPTY_CONTENT} editable={false} />
        </div>
      </div>
    </section>
  );
}
