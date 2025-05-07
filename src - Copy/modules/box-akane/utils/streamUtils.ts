/**
 * Chuyển đổi ReadableStream từ fetch thành generator đọc dễ dàng
 */
export async function* streamAsyncIterator(stream: ReadableStream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Xử lý chunks từ Server-Sent Events
 * Format: data: {JSON}\n\n
 */
export function parseSSEResponse(chunk: Uint8Array): string | null {
  const text = new TextDecoder().decode(chunk);
  const lines = text.split('\n').filter(Boolean);
  
  for (const line of lines) {
    const message = line.replace(/^data: /, '').trim();
    
    // Bỏ qua thông báo [DONE] khi stream kết thúc
    if (message === '[DONE]') return null;
    
    try {
      // Thử parse JSON
      const data = JSON.parse(message);
      return data.choices?.[0]?.delta?.content || '';
    } catch (error) {
      // Nếu không phải JSON, trả về text gốc
      return message;
    }
  }
  
  return null;
}

/**
 * Xử lý văn bản streaming
 */
export function processStreamingText(text: string, processor?: (text: string) => string): string {
  if (!processor) return text;
  return processor(text);
}

/**
 * Kiểm tra hỗ trợ streaming
 */
export function isStreamingSupported(): boolean {
  return typeof ReadableStream !== 'undefined' && typeof TextDecoder !== 'undefined';
} 