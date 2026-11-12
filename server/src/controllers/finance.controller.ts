import { Request, Response, NextFunction } from 'express';
import { FinanceService } from '../services/finance.service';
import { sendSuccess } from '../utils/apiResponse';

export class FinanceController {
  public static async getSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const merchantId = (req.query.merchantId as string) || undefined;
      const data = await FinanceService.getFinanceSummary(merchantId);
      sendSuccess(res, 'Financial summary retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }
}

