export const SITE_NAME = '¡Hablemos Cripto!';
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://hablemoscripto.com').replace(/\/+$/, '');
export const SITE_TITLE = 'Hablemos Cripto | Bitcoin, minería de Bitcoin y educación cripto';
export const SITE_DESCRIPTION =
  'Aprende sobre Bitcoin, criptomonedas y minería de Bitcoin con asesoría personalizada, formación práctica, actualidad del mercado y contenido educativo para Ecuador y Latinoamérica.';
export const DEFAULT_OG_IMAGE = absoluteUrl('/images/reveal.jpg');
export const SOCIAL_PROFILES = [
  'https://www.facebook.com/dcjacome/',
  'https://www.instagram.com/dvjacome/',
  'https://vm.tiktok.com/ZS98JrYVLj4N1-OMwWb/',
  'https://www.youtube.com/@hablemoscripto2025',
];

export const SITE_KEYWORDS = [
  'bitcoin',
  'mineria de bitcoin',
  'criptomonedas',
  'educacion cripto',
  'blockchain',
  'asesoria bitcoin',
  'mineria bitcoin ecuador',
  'bitcoin ecuador',
  'hablemos cripto',
];

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
