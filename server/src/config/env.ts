import dotenv from 'dotenv';
import path from 'path';

// Load .env from server root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface AppConfig {
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
  clientUrl: string;
  supabase: {
    url: string | null;
    serviceRoleKey: string | null;
    isConfigured: boolean;
  };
  sarvam: {
    apiKey: string | null;
    isConfigured: boolean;
  };
}

const parsePort = (val: string | undefined, defaultPort: number): number => {
  if (!val) return defaultPort;
  const parsed = parseInt(val, 10);
  return Number.isNaN(parsed) ? defaultPort : parsed;
};

export const config: AppConfig = {
  port: parsePort(process.env.PORT, 5000),
  nodeEnv: (process.env.NODE_ENV as AppConfig['nodeEnv']) || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  supabase: {
    url: process.env.SUPABASE_URL || null,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || null,
    isConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
  },
  sarvam: {
    apiKey: process.env.SARVAM_API_KEY || null,
    isConfigured: Boolean(process.env.SARVAM_API_KEY),
  },
};

export const validateEnv = (): void => {
  const missingConfigs: string[] = [];

  if (!config.supabase.isConfigured) {
    missingConfigs.push('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (Database integration will use fallback mock data)');
  }

  if (!config.sarvam.isConfigured) {
    missingConfigs.push('SARVAM_API_KEY (AI advisor will respond in development mock mode)');
  }

  if (missingConfigs.length > 0) {
    console.warn('\n⚠️  [SETU Environment Warning] The following optional services are not yet configured in server/.env:');
    missingConfigs.forEach((item) => console.warn(`   - ${item}`));
    console.warn('   Add these to server/.env when ready for live database & AI integrations.\n');
  }
};

