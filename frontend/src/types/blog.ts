export type BlogPostStatus = 'draft' | 'published';

export interface BlogAuthor {
  id: number;
  email: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content_json?: Record<string, unknown>;
  cover_image_path: string | null;
  cover_image_url: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  author: BlogAuthor | null;
}

export interface BlogPostWritePayload {
  title: string;
  slug: string;
  excerpt: string;
  content_json: Record<string, unknown>;
  cover_image_path: string | null;
  status: BlogPostStatus;
  published_at: string | null;
}

export interface BlogPostListResponse {
  items: BlogPost[];
}

export interface BlogUploadResponse {
  path: string;
  url: string;
}

export interface BlogMutationResponse {
  success: boolean;
}
