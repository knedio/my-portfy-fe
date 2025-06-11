import { ProfileForm } from '@/models/forms/profile-form.model';
import { SearchPayload } from '@/models/general/paginations/search-payload.model';
import { SearchResponse } from '@/models/general/paginations/search-response.model';
import { User } from '@/models/user.model';
import { api } from '@/utils/api';
import { AxiosResponse } from 'axios';

export const getUsers = async (params: SearchPayload): Promise<SearchResponse<User>> => {
  const response: AxiosResponse<SearchResponse<User>> = await api.get('/users', params);
  return response.data;
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

export const updateUserTemplate = async (
  templateId: number
): Promise<{ success: boolean; user: User }> => {
  const response: AxiosResponse<{ success: boolean; user: User }> = await api.post(
    '/user/template',
    {
      template_id: templateId,
    }
  );

  return response.data;
};

export const updatePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return await api.post('/user/update-password', payload);
};

export const uploadProfilePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response: AxiosResponse<{ message: string; user: User }> = await api.post(
    '/user/upload-photo',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  return response.data;
};

export const updateProfileSettings = async (formValues: ProfileForm) => {
  return api.put('/user/update-profile', formValues);
};
