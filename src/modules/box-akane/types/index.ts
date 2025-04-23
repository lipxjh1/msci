export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface DeepSeekConfig {
  model: string; // 'deepseek-chat' hoặc 'deepseek-reasoner'
  streaming: boolean;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatOptions {
  systemPrompt?: string;
  model?: string;
  streaming?: boolean;
}

export interface ApiKey {
  id: number;
  key: string;
  provider: string;
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
  priority: number;
}

export interface ChatResponse {
  response: string;
  source?: string;
  provider?: string;
  model?: string;
  fallback?: boolean;
  error?: string;
} 