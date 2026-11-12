export interface HealthStatus {
  status: 'healthy' | 'degraded';
  uptimeSeconds: number;
  timestamp: string;
  environment: string;
  services: {
    database: 'connected' | 'unconfigured' | 'error';
    sarvamAI: 'configured' | 'unconfigured';
  };
}

export class HealthService {
  public static getHealth(databaseConnected: boolean, sarvamConfigured: boolean): HealthStatus {
    return {
      status: 'healthy',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: databaseConnected ? 'connected' : 'unconfigured',
        sarvamAI: sarvamConfigured ? 'configured' : 'unconfigured',
      },
    };
  }
}

