import { api } from '@/utils/api';
import { PortfolioDetails } from '@/models/portfolio.model';
import { ApiResponse } from '@/models/general/responses/api-response.model';

export const savePortfolioDetails = async (data: PortfolioDetails) => {
  const response = await api.post('/portfolio', data);
  return response.data;
};

export const getPortfolioDetails = async (): Promise<ApiResponse<PortfolioDetails>> => {
  const response = await api.get<ApiResponse<PortfolioDetails>>('/portfolio');
  return response.data;
};
