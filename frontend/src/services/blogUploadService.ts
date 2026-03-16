import { apiRequest } from './http';
import type { BlogMutationResponse, BlogUploadResponse } from '../types/blog';

export const blogUploadService = {
  async uploadCover(postId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest<BlogUploadResponse>({
      path: `/admin/blog-posts/${postId}/cover`,
      method: 'POST',
      body: formData,
    });
  },

  deleteCover(postId: number) {
    return apiRequest<BlogMutationResponse>({
      path: `/admin/blog-posts/${postId}/cover`,
      method: 'DELETE',
    });
  },

  async uploadContentImage(postId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest<BlogUploadResponse>({
      path: `/admin/blog-posts/${postId}/images`,
      method: 'POST',
      body: formData,
    });
  },

  deleteContentImage(postId: number, path: string) {
    return apiRequest<BlogMutationResponse>({
      path: `/admin/blog-posts/${postId}/images`,
      method: 'DELETE',
      body: JSON.stringify({ path }),
    });
  },
};
