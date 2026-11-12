import { Request, Response, NextFunction } from 'express';
import { AiService } from '../services/ai.service';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { ChatRequest } from '../types/models';

export class AiController {
  public static async chat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { message, merchantId, conversationHistory, context } = req.body as ChatRequest;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        sendError(res, 'Validation failed: "message" field is required and cannot be empty.', 400);
        return;
      }

      const response = await AiService.processChat({
        message: message.trim(),
        merchantId,
        conversationHistory,
        context,
      });

      sendSuccess(res, 'AI Advisor response generated', response, 200);
    } catch (error) {
      next(error);
    }
  }
}

