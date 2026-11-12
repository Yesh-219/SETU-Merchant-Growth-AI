import { Request, Response, NextFunction } from 'express';
import { InventoryService } from '../services/inventory.service';
import { sendSuccess } from '../utils/apiResponse';

export class InventoryController {
  public static async getInventory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const merchantId = (req.query.merchantId as string) || undefined;
      const data = await InventoryService.getInventoryList(merchantId);
      sendSuccess(res, 'Inventory items retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }

  public static async getRecommendations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const merchantId = (req.query.merchantId as string) || undefined;
      const data = await InventoryService.getRecommendations(merchantId);
      sendSuccess(res, 'Inventory recommendations retrieved successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }
}

