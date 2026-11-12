export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
  meta?: {
    timestamp: string;
    version?: string;
  };
}

export interface ApiError {
  message: string;
  statusCode?: number;
  details?: unknown;
}

