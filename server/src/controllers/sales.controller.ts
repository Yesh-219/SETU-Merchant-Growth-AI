import { Request, Response, NextFunction } from 'express';
import { SalesService } from '../services/sales.service';
import { sendSuccess } from '../utils/apiResponse';

export class SalesController {
  public static async getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const merchantId = (req.query.merchantId as string) || undefined;
      const data = await SalesService.getSalesSummary(merchantId);
      sendSuccess(res, 'Sales summary retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const merchantId = (req.query.merchantId as string) || undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 5;
      const data = await SalesService.getTopProducts(merchantId, limit);
      sendSuccess(res, 'Top selling products retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }
}

