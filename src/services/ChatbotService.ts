import axios from 'axios';
import { ChatbotMessage } from '../types/chatbot';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export class ChatbotService {
  static async getMessages(page: number = 1, searchTerm: string = '', limit: number = 10) {
    const response = await axios.get(`${API_URL}/chatbot`, {
      params: { page, search: searchTerm, limit }
    });
    return response.data;
  }

  static async createMessage(message: Omit<ChatbotMessage, 'id' | 'ngay_tao'>) {
    const response = await axios.post(`${API_URL}/chatbot`, message);
    return response.data;
  }

  static async updateMessage(id: string, message: Partial<ChatbotMessage>) {
    const response = await axios.put(`${API_URL}/chatbot/${id}`, message);
    return response.data;
  }

  static async deleteMessage(id: string) {
    const response = await axios.delete(`${API_URL}/chatbot/${id}`);
    return response.data;
  }

  static async getMessage(id: string) {
    const response = await axios.get(`${API_URL}/chatbot/${id}`);
    return response.data;
  }
} 