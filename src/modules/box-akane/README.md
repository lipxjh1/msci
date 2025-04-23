# Box Akane - Module Chat AI với DeepSeek

Module này cung cấp tính năng chat AI sử dụng DeepSeek API, được tích hợp với Supabase để quản lý API key.

## Cấu trúc

Module được tổ chức theo cấu trúc sau:

```
src/modules/box-akane/
├── components/        # Các component React
├── services/          # Service để gọi DeepSeek API
├── hooks/             # React hooks
├── utils/             # Utility functions
├── types/             # Type definitions
└── index.tsx          # Entry point
```

## Cài đặt

Module này đã được tích hợp sẵn vào codebase. Không cần cài đặt thêm.

## Sử dụng

### 1. Thêm component chat vào trang:

```tsx
import ChatInterface from '@/modules/box-akane';

export default function YourPage() {
  return (
    <div>
      <h1>Trang của bạn</h1>
      
      {/* Thêm Box Akane Chat */}
      <ChatInterface 
        modelName="deepseek-chat"
        enableStreaming={true}
        systemPrompt="Bạn là Akane, một trợ lý AI thông minh và thân thiện."
      />
    </div>
  );
}
```

### 2. Sử dụng hook để tích hợp chat vào component của bạn:

```tsx
import { useDeepSeekChat } from '@/modules/box-akane';

function CustomChatComponent() {
  const { messages, isLoading, error, sendMessage, resetChat } = useDeepSeekChat({
    systemPrompt: "Bạn là một trợ lý AI có tên Akane.",
    model: "deepseek-chat",
    streaming: true
  });
  
  // Thêm UI của bạn ở đây
}
```

### 3. Gọi API trực tiếp:

```tsx
import { DeepSeekService } from '@/modules/box-akane';

async function sendChatMessage(messageContent: string) {
  const messages = [
    { role: 'system', content: 'Bạn là Akane.' },
    { role: 'user', content: messageContent }
  ];
  
  const response = await DeepSeekService.chat(messages, {
    model: 'deepseek-chat',
    streaming: false
  });
  
  console.log(response);
}
```

## API

### ChatInterface Props

| Prop | Type | Mặc định | Mô tả |
|------|------|---------|-------|
| `systemPrompt` | string | (xem code) | Prompt system cho AI |
| `modelName` | string | 'deepseek-chat' | Model name (deepseek-chat hoặc deepseek-reasoner) |
| `enableStreaming` | boolean | true | Bật/tắt phản hồi streaming |
| `className` | string | '' | CSS classes thêm vào |
| `defaultOpen` | boolean | false | Mở chat khi tải trang |
| `position` | string | 'bottom-right' | Vị trí của chat box |
| `botName` | string | 'Akane' | Tên hiển thị của bot |
| `placeholderText` | string | 'Nhập tin nhắn...' | Placeholder cho ô nhập liệu |

### useDeepSeekChat Options

| Option | Type | Mặc định | Mô tả |
|--------|------|---------|-------|
| `systemPrompt` | string | undefined | Prompt system cho AI |
| `model` | string | 'deepseek-chat' | Model name (deepseek-chat hoặc deepseek-reasoner) |
| `streaming` | boolean | false | Bật/tắt phản hồi streaming |

## Lưu ý 

- Cần có API key DeepSeek trong bảng `api_keys` của Supabase với `provider = 'deepseek'` và `is_active = true`
- Để sử dụng streaming, browser phải hỗ trợ ReadableStream và TextDecoder
- Thay đổi `systemPrompt` để điều chỉnh cách bot trả lời

## API Routes

Module này bao gồm API route `/api/deepseek-chat` để gọi DeepSeek API từ server. Có thể sử dụng API này như sau:

```typescript
// Non-streaming
const response = await fetch('/api/deepseek-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'Bạn là Akane.' },
      { role: 'user', content: 'Xin chào!' }
    ],
    model: 'deepseek-chat',
    stream: false
  })
});

const data = await response.json();
console.log(data.content); // Phản hồi từ AI
```

```typescript
// Streaming
const response = await fetch('/api/deepseek-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'Bạn là Akane.' },
      { role: 'user', content: 'Xin chào!' }
    ],
    model: 'deepseek-chat',
    stream: true
  })
});

const reader = response.body.getReader();
// Xử lý stream...
``` 