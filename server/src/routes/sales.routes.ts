import { Router } from 'express';
import { SalesController } from '../controllers/sales.controller';

const router = Router();

router.get('/summary', SalesController.getSummary);
router.get('/products', SalesController.getProducts);

export default router;

