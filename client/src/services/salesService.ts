import apiClient from './api';
import { ApiResponse } from '../types/api';
import { SalesSummary, TopProduct } from '../types/models';

export const salesService = {
  async getSummary(merchantId?: string): Promise<SalesSummary> {
    const response = await apiClient.get<ApiResponse<SalesSummary>>('/sales/summary', {
      params: { merchantId },
    });
    return response.data.data;
  },

  async getTopProducts(merchantId?: string, limit = 5): Promise<TopProduct[]> {
    const response = await apiClient.get<ApiResponse<TopProduct[]>>('/sales/products', {
      params: { merchantId, limit },
    });
    return response.data.data;
  },
};

