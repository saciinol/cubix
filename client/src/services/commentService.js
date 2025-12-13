import api from './api';

export const getComments = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}

export const createComment = async (postId, commentData) => {
  const response = await api.post(`/posts/${postId}/comments`, commentData);
  return response.data;
}

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/posts/comments/${commentId}`);
  return response.data;
}