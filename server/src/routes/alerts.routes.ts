import { Router } from 'express';
import { AlertsController } from '../controllers/alerts.controller';

const router = Router();

router.get('/', AlertsController.getAlerts);

export default router;

