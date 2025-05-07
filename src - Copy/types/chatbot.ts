export interface ChatbotMessage {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at?: string;
}

export interface ApiUsageLog {
  id: number;
  timestamp: string;
  tokens_used: number;
  request_type: string;
  status: string;
  error?: string;
  cost: number;
  message_content?: string;
  provider?: string; // Nhà cung cấp API: 'deepseek', 'openai', 'anthropic', etc.
}

export interface ApiUsageStats {
  total_calls: number;
  total_tokens: number;
  total_cost: number;
  success_rate: number;
  usage_by_date: {
    date: string;
    calls: number;
    tokens: number;
    cost: number;
  }[];
  usage_by_provider?: {
    provider: string;
    calls: number;
    tokens: number;
    cost: number;
    success_rate: number;
  }[];
}

export interface ApiKey {
  id: number;
  key: string;
  provider: string; // 'deepseek', 'openai', 'anthropic', v.v...
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  last_used_at?: string;
  usage_count: number;
  usage_limit?: number;
  remaining_quota?: number;
  tags?: string[];
  priority: number; // Mức độ ưu tiên của API (cao hơn = ưu tiên hơn)
}

export interface ApiKeyConfig {
  selection_strategy: 'round_robin' | 'priority' | 'random' | 'least_used';
  fallback_enabled: boolean;
  max_tries_before_fallback: number;
  usage_monitoring_enabled: boolean;
  auto_rotate_on_limit: boolean;
} 