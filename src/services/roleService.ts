import { SearchPayload } from '@/models/general/paginations/search-payload.model';
import { SearchResponse } from '@/models/general/paginations/search-response.model';
import { Role } from '@/models/role.model';
import { api } from '@/utils/api';
import { AxiosResponse } from 'axios';

export const getRoles = async (params: SearchPayload): Promise<SearchResponse<Role>> => {
  const response: AxiosResponse<SearchResponse<Role>> = await api.get('/roles', params);
  return response.data;
};

export const getRoleById = async (roleId: number) => {
  return api.get(`/roles/${roleId}`);
};

export const createRole = async (roleData: { name: string; email: string; password: string }) => {
  return api.post('/roles', roleData);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateRole = async (roleId: number, roleData: any) => {
  return api.put(`/roles/${roleId}`, roleData);
};

export const deleteRole = async (roleId: number) => {
  return api.delete(`/roles/${roleId}`);
};
