import { ApiResponse } from '@/models/general/responses/api-response.model';
import { Profession } from '@/models/profession.model';
import { api } from '@/utils/api';

export const getProfessions = async () => {
  const response = await api.get<ApiResponse<Profession[]>>('/professions');
  return response.data;
};
