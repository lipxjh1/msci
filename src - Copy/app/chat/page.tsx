'use client';

import React, { useState } from 'react';
import ChatInterface from '@/modules/box-akane';

export default function ChatPage() {
  const [model, setModel] = useState<string>('deepseek-chat');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center my-6">Akane Chat AI</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Cấu hình</h2>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Model</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="deepseek-chat">DeepSeek Chat</option>
              <option value="deepseek-reasoner">DeepSeek Reasoner</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isStreaming}
                onChange={(e) => setIsStreaming(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm">Bật streaming (phản hồi từng phần)</span>
            </label>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-md font-medium mb-2">Thông tin</h3>
            <ul className="text-sm space-y-1">
              <li>• Trang này sử dụng DeepSeek API cho trò chuyện AI</li>
              <li>• API keys được lấy tự động từ Supabase</li>
              <li>• Hỗ trợ hai models: deepseek-chat và deepseek-reasoner</li>
              <li>• Có thể sử dụng chế độ streaming hoặc non-streaming</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm">
          <p>Nút chat sẽ hiển thị ở góc phải bên dưới màn hình.</p>
        </div>
      </div>
      
      {/* ChatInterface component */}
      <ChatInterface
        modelName={model}
        enableStreaming={isStreaming}
        systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện. Hãy giúp đỡ người dùng một cách nhiệt tình và chính xác bằng tiếng Việt."
        botName="Akane AI"
        defaultOpen={false}
      />
    </div>
  );
} 