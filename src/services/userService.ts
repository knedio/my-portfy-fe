import { api } from '@/utils/api';

export const getUsers = async () => {
  return api.get('/users');
};

export const getUserById = async (userId: number) => {
  return api.get(`/users/${userId}`);
};

export const createUser = async (userData: { name: string; email: string; password: string }) => {
  return api.post('/users', userData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (userId: number, userData: any) => {
  return api.put(`/users/${userId}`, userData);
};

export const deleteUser = async (userId: number) => {
  return api.delete(`/users/${userId}`);
};

export const updateUserTemplate = async (templateId: number) => {
  return await api.post('/user/template', { template_id: templateId });
};
