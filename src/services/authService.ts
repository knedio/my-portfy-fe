import { AuthResponse } from '@/models/auth.model';
import { ApiResponse } from '@/models/general/responses/api-response.model';
import { User } from '@/models/user.model';
import { api, setAuthToken, clearAuthToken } from '@/utils/api';
import { AxiosResponse } from 'axios';

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post('/register', {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await api.post('/login', {
    email,
    password,
  });

  setAuthToken(response.data.token);
  return response.data;
};

export const logoutUser = async () => {
  await api.post('/logout');
  clearAuthToken();
};

export const getUserProfile = async () => {
  const response = await api.get<ApiResponse<User>>('/auth/me');
  return response.data;
};
