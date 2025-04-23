import ChatInterface from './components/ChatInterface';
import { DeepSeekService } from './services/DeepSeekService';
import { useDeepSeekChat } from './hooks/useDeepSeekChat';
import * as streamUtils from './utils/streamUtils';
import * as Types from './types';

// Xuất ra các thành phần để sử dụng từ bên ngoài
export {
  ChatInterface,
  DeepSeekService,
  useDeepSeekChat,
  streamUtils,
  Types
};

// Mặc định xuất ra component ChatInterface
export default ChatInterface; 