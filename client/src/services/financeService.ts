import apiClient from './api';
import { ApiResponse } from '../types/api';
import { FinanceSummary } from '../types/models';

export const financeService = {
  async getSummary(merchantId?: string): Promise<FinanceSummary> {
    const response = await apiClient.get<ApiResponse<FinanceSummary>>('/finance/summary', {
      params: { merchantId },
    });
    return response.data.data;
  },
};

