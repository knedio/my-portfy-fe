import { Template } from '@/models/template.model';
import { api } from '@/utils/api';
import { AxiosResponse } from 'axios';

export const getAllTemplates = async (): Promise<Template[]> => {
  const response: AxiosResponse<Template[]> = await api.get('/templates');

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
