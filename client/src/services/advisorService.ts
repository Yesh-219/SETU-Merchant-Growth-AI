import apiClient from './api';
import { ApiResponse } from '../types/api';

export interface ChatResponsePayload {
  reply: string;
  suggestedActions?: string[];
  insights?: {
    category: 'inventory' | 'sales' | 'finance' | 'general';
    metric?: string;
  };
  provider: string;
}

export const advisorService = {
  async sendMessage(message: string, merchantId?: string, history?: unknown[]): Promise<ChatResponsePayload> {
    const response = await apiClient.post<ApiResponse<ChatResponsePayload>>('/ai/chat', {
      message,
      merchantId,
      conversationHistory: history,
    });
    return response.data.data;
  },
};

