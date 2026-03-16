import { apiRequest } from './http';
import type { BlogPost, BlogPostListResponse } from '../types/blog';

export const blogPublicService = {
  list() {
    return apiRequest<BlogPostListResponse>({
      path: '/blog-posts',
      method: 'GET',
    });
  },

  getBySlug(slug: string) {
    return apiRequest<BlogPost>({
      path: `/blog-posts/${slug}`,
      method: 'GET',
    });
  },
};
