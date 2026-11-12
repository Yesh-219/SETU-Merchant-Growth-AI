import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/env';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

export const createApp = (): Application => {
  const app: Application = express();

  // CORS configuration
  app.use(
    cors({
      origin: [
        config.clientUrl,
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root redirect/status
  app.get('/', (_req, res) => {
    res.json({
      name: 'SETU - AI-Powered Business Growth & Financial Intelligence Copilot',
      version: '1.0.0',
      status: 'operational',
      documentation: '/api/health',
    });
  });

  // Mount API router
  app.use('/api', apiRouter);

  // 404 Not Found Middleware
  app.use(notFoundHandler);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};

