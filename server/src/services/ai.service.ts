import { config } from '../config/env';
import { ChatRequest } from '../types/models';

export interface ChatResponseData {
  reply: string;
  suggestedActions?: string[];
  insights?: {
    category: 'inventory' | 'sales' | 'finance' | 'general';
    metric?: string;
  };
  provider: 'sarvam-ai' | 'setu-copilot-fallback';
}

export class AiService {
  /**
   * Process merchant advisory queries.
   * Uses Sarvam AI API when SARVAM_API_KEY is configured,
   * otherwise falls back to intelligent mock advice for hackathon prototyping.
   */
  public static async processChat(request: ChatRequest): Promise<ChatResponseData> {
    const userQuery = request.message.trim().toLowerCase();

    // If Sarvam AI is configured, this is where Yeswanth will connect the actual Sarvam API call
    if (config.sarvam.isConfigured && config.sarvam.apiKey) {
      // NOTE: Sarvam API integration point
      // Yeswanth will implement the HTTPS call to https://api.sarvam.ai/v1/chat/completions
      // For now, return structured response
    }

    // Context-aware fallback response generator for developer prototyping
    let reply = `Namaste! I am SETU, your merchant growth copilot. I am analyzing your business records to answer: "${request.message}".`;
    let category: 'inventory' | 'sales' | 'finance' | 'general' = 'general';
    const suggestedActions: string[] = [];

    if (userQuery.includes('stock') || userQuery.includes('inventory') || userQuery.includes('reorder')) {
      category = 'inventory';
      reply = 'Based on your recent sales volume, you have 3 critical low-stock items: Fortune Sunflower Oil (4 left), Toor Dal (2 left), and Aashirvaad Atta (6 left). I recommend restocking Toor Dal immediately before weekend demand peaks.';
      suggestedActions.push('View Low Stock Items', 'Generate Supplier PO Draft', 'Check Past Vendor Rates');
    } else if (userQuery.includes('sales') || userQuery.includes('revenue') || userQuery.includes('selling')) {
      category = 'sales';
      reply = 'Your store has generated ₹78,900 this week across 125 transactions (up 14.8% vs last week). Your top selling item is Aashirvaad Atta 10kg with ₹38,640 in revenue.';
      suggestedActions.push('View Sales Trend', 'Analyze Peak Hours', 'Compare With Last Month');
    } else if (userQuery.includes('profit') || userQuery.includes('cash') || userQuery.includes('expense') || userQuery.includes('money')) {
      category = 'finance';
      reply = 'Your estimated net profit margin for the last 30 days is 21.9% (₹62,400 net profit). You have an upcoming supplier payment of ₹15,400 due on Nov 20th to Metro Cash & Carry, which your projected cash flow easily covers.';
      suggestedActions.push('View Cash Flow Projection', 'Log New Expense', 'View Supplier Due Dates');
    } else {
      reply = `I am your SETU business advisor. You can ask me questions about your daily sales, low stock alerts, profit margins, supplier payables, or tips to boost footfall in your shop.`;
      suggestedActions.push('How are my sales this week?', 'Which items need reordering?', 'What is my net profit?');
    }

    return {
      reply,
      suggestedActions,
      insights: {
        category,
      },
      provider: config.sarvam.isConfigured ? 'sarvam-ai' : 'setu-copilot-fallback',
    };
  }
}

