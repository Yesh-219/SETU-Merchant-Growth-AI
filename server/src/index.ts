import { createApp } from './app';
import { config, validateEnv } from './config/env';

const startServer = (): void => {
  // Validate environment variables on startup
  validateEnv();

  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log(`
=====================================================
🚀 SETU Backend Server Running
📡 Port:        ${config.port}
🌍 Environment: ${config.nodeEnv}
🔗 URL:         http://localhost:${config.port}
🩺 Health Check: http://localhost:${config.port}/api/health
=====================================================
    `);
  });

  // Graceful shutdown
  const handleShutdown = (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('🔒 HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
};

startServer();

