import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';

const router = Router();

router.get('/', InventoryController.getInventory);
router.get('/recommendations', InventoryController.getRecommendations);

export default router;

