import { Router } from 'express';
import healthRoutes from './health.routes';
import dashboardRoutes from './dashboard.routes';
import salesRoutes from './sales.routes';
import inventoryRoutes from './inventory.routes';
import financeRoutes from './finance.routes';
import alertsRoutes from './alerts.routes';
import aiRoutes from './ai.routes';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/sales', salesRoutes);
apiRouter.use('/inventory', inventoryRoutes);
apiRouter.use('/finance', financeRoutes);
apiRouter.use('/alerts', alertsRoutes);
apiRouter.use('/ai', aiRoutes);

export default apiRouter;

