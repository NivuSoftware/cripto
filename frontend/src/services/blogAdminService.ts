import { apiRequest } from './http';
import type { BlogMutationResponse, BlogPost, BlogPostListResponse, BlogPostWritePayload } from '../types/blog';

export const blogAdminService = {
  list(params?: { status?: string; q?: string }) {
    const searchParams = new URLSearchParams();

    if (params?.status) {
      searchParams.set('status', params.status);
    }

    if (params?.q) {
      searchParams.set('q', params.q);
    }

    const query = searchParams.toString();

    return apiRequest<BlogPostListResponse>({
      path: `/admin/blog-posts${query ? `?${query}` : ''}`,
      method: 'GET',
    });
  },

  getById(postId: number) {
    return apiRequest<BlogPost>({
      path: `/admin/blog-posts/${postId}`,
      method: 'GET',
    });
  },

  create(payload: BlogPostWritePayload) {
    return apiRequest<BlogPost>({
      path: '/admin/blog-posts',
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update(postId: number, payload: BlogPostWritePayload) {
    return apiRequest<BlogPost>({
      path: `/admin/blog-posts/${postId}`,
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  remove(postId: number) {
    return apiRequest<BlogMutationResponse>({
      path: `/admin/blog-posts/${postId}`,
      method: 'DELETE',
    });
  },
};
