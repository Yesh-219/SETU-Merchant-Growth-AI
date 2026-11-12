import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { sendSuccess } from '../utils/apiResponse';

export class DashboardController {
  public static async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const merchantId = (req.query.merchantId as string) || undefined;
      const data = await DashboardService.getDashboardMetrics(merchantId);
      sendSuccess(res, 'Dashboard metrics retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }
}

