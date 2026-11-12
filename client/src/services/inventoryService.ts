import apiClient from './api';
import { ApiResponse } from '../types/api';
import { InventoryItem, InventoryRecommendation } from '../types/models';

export const inventoryService = {
  async getInventory(merchantId?: string): Promise<InventoryItem[]> {
    const response = await apiClient.get<ApiResponse<InventoryItem[]>>('/inventory', {
      params: { merchantId },
    });
    return response.data.data;
  },

  async getRecommendations(merchantId?: string): Promise<InventoryRecommendation[]> {
    const response = await apiClient.get<ApiResponse<InventoryRecommendation[]>>('/inventory/recommendations', {
      params: { merchantId },
    });
    return response.data.data;
  },
};

