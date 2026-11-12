import { Request, Response, NextFunction } from 'express';
import { AlertsService } from '../services/alerts.service';
import { sendSuccess } from '../utils/apiResponse';

export class AlertsController {
  public static async getAlerts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const merchantId = (req.query.merchantId as string) || undefined;
      const data = await AlertsService.getActiveAlerts(merchantId);
      sendSuccess(res, 'Active business alerts retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }
}

