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
} 