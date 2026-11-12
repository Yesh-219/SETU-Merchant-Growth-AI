import { Request, Response, NextFunction } from 'express';
import { HealthService } from '../services/health.service';
import { isDatabaseConnected } from '../config/database';
import { config } from '../config/env';
import { sendSuccess } from '../utils/apiResponse';

export class HealthController {
  public static async getHealth(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = HealthService.getHealth(isDatabaseConnected(), config.sarvam.isConfigured);
      sendSuccess(res, 'SETU Merchant Growth AI backend is operational', data, 200);
    } catch (error) {
      next(error);
    }
  }
}

