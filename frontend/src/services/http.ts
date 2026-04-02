const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  path: string;
}

function buildUrl(path: string) {
  const normalizedBaseUrl = API_BASE_URL.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}

export function resolveAssetUrl(path: string | null) {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Si la API_BASE_URL es relativa (producción, mismo dominio via Nginx),
  // el path ya es accesible directamente desde el origen actual
  if (API_BASE_URL.startsWith('/')) {
    return path;
  }

  const apiUrl = new URL(API_BASE_URL);
  return `${apiUrl.origin}${path}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'No se pudo completar la solicitud';

    try {
      const errorData = await response.json();
      message = errorData.message ?? errorData.error ?? message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function apiRequest<T>({ path, headers, ...options }: RequestOptions): Promise<T> {
  const resolvedHeaders: Record<string, string> = {
    ...(headers as Record<string, string> | undefined),
  };

  if (!(options.body instanceof FormData)) {
    resolvedHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(buildUrl(path), {
    credentials: 'include',
    headers: resolvedHeaders,
    ...options,
  });

  return parseResponse<T>(response);
}
