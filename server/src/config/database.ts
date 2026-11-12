import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './env';

let supabaseClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (config.supabase.url && config.supabase.serviceRoleKey) {
    try {
      supabaseClient = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
      console.log('✅ Supabase client initialized successfully.');
    } catch (error) {
      console.error('❌ Failed to initialize Supabase client:', error);
      supabaseClient = null;
    }
  }

  return supabaseClient;
};

export const isDatabaseConnected = (): boolean => {
  return config.supabase.isConfigured && supabaseClient !== null;
};

