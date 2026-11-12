import apiClient from './api';
import { ApiResponse } from '../types/api';
import { DashboardMetrics, BusinessAlert } from '../types/models';

export const dashboardService = {
  async getMetrics(merchantId?: string): Promise<DashboardMetrics> {
    const response = await apiClient.get<ApiResponse<DashboardMetrics>>('/dashboard', {
      params: { merchantId },
    });
    return response.data.data;
  },

  async getAlerts(merchantId?: string): Promise<BusinessAlert[]> {
    const response = await apiClient.get<ApiResponse<BusinessAlert[]>>('/alerts', {
      params: { merchantId },
    });
    return response.data.data;
  },
};

