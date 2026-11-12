import { Router } from 'express';
import { FinanceController } from '../controllers/finance.controller';

const router = Router();

router.get('/summary', FinanceController.getSummary);

export default router;

