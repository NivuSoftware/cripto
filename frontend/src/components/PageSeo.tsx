import { useEffect } from 'react';
import { DEFAULT_OG_IMAGE, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, absoluteUrl } from '../lib/site';

interface PageSeoProps {
  title?: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  publishedTime?: string | null;
  modifiedTime?: string | null;
}

function upsertMeta(attribute: 'name' | 'property', value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function removeMeta(attribute: 'name' | 'property', value: string) {
  document.head.querySelector(`meta[${attribute}="${value}"]`)?.remove();
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function upsertStructuredData(schemaJson: string) {
  const scriptId = 'page-seo-structured-data';
  let element = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.id = scriptId;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = schemaJson;
}

export function PageSeo({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords = SITE_KEYWORDS,
  canonical,
  noindex = false,
  schema,
  publishedTime,
  modifiedTime,
}: PageSeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
  const canonicalUrl = canonical ?? absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const keywordsContent = keywords.join(', ');
  const schemaJson = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywordsContent);
    upsertMeta(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow, noarchive'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    upsertMeta('name', 'googlebot', noindex ? 'noindex, nofollow, noarchive' : 'index, follow');

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'es_EC');
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    if (type === 'article' && publishedTime) {
      upsertMeta('property', 'article:published_time', publishedTime);
    } else {
      removeMeta('property', 'article:published_time');
    }

    if (type === 'article' && modifiedTime) {
      upsertMeta('property', 'article:modified_time', modifiedTime);
    } else {
      removeMeta('property', 'article:modified_time');
    }

    upsertCanonical(canonicalUrl);

    if (schemaJson) {
      upsertStructuredData(schemaJson);
    } else {
      document.getElementById('page-seo-structured-data')?.remove();
    }
  }, [
    canonicalUrl,
    description,
    fullTitle,
    imageUrl,
    keywordsContent,
    modifiedTime,
    noindex,
    publishedTime,
    schemaJson,
    type,
  ]);

  return null;
}
