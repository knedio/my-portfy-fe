import { SearchPayload } from '@/models/general/paginations/search-payload.model';
import { SearchResponse } from '@/models/general/paginations/search-response.model';
import { Template } from '@/models/template.model';
import { api } from '@/utils/api';
import { AxiosResponse } from 'axios';

export const getAllTemplates = async (): Promise<Template[]> => {
  const response: AxiosResponse<Template[]> = await api.get('/templates/all');

  return response.data;
};

export const getTemplates = async (params: SearchPayload): Promise<SearchResponse<Template>> => {
  const response: AxiosResponse<SearchResponse<Template>> = await api.get('/templates', params);
  return response.data;
};

export const getTemplateById = async (id: number): Promise<Template> => {
  const response: AxiosResponse<Template> = await api.get(`/templates/${id}`);

  return response.data;
};

export const saveUserTemplate = async (templateId: number): Promise<{ success: boolean }> => {
  const response: AxiosResponse<{ success: boolean }> = await api.post('/user/template', {
    template_id: templateId,
  });

  return response.data;
};
