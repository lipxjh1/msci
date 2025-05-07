"use client";

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';

interface ChatQA {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

export default function ChatQAAdmin() {
  const [qaList, setQaList] = useState<ChatQA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState<'add' | 'edit' | null>(null);
  const [currentQA, setCurrentQA] = useState<Partial<ChatQA>>({ question: '', answer: '' });

  // Fetch QA data
  const fetchQAData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/chat-qa');
      const result = await response.json();
      
      if (result.success) {
        setQaList(result.data);
      } else {
        setError(result.error || 'Lỗi khi tải dữ liệu');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQAData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentQA.question || !currentQA.answer) {
      setError('Vui lòng nhập cả câu hỏi và câu trả lời');
      return;
    }
    
    try {
      const url = '/api/chat-qa';
      const method = formMode === 'add' ? 'POST' : 'PUT';
      const body = formMode === 'add'
        ? JSON.stringify({ question: currentQA.question, answer: currentQA.answer })
        : JSON.stringify({ id: currentQA.id, question: currentQA.question, answer: currentQA.answer });
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchQAData();
        resetForm();
      } else {
        setError(result.error || `Lỗi khi ${formMode === 'add' ? 'thêm' : 'cập nhật'} dữ liệu`);
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error(err);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mục này?')) return;
    
    try {
      const response = await fetch(`/api/chat-qa?id=${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchQAData();
      } else {
        setError(result.error || 'Lỗi khi xóa dữ liệu');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      console.error(err);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormMode(null);
    setCurrentQA({ question: '', answer: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[var(--accent-blue-bright)] border-b pb-4 border-[var(--accent-blue-glow)]/30">
          Quản lý Câu hỏi & Trả lời ChatBot
        </h1>
        
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-white p-4 rounded-lg mb-6 flex items-center justify-between">
            <p>{error}</p>
            <button onClick={() => setError('')} className="text-white">
              <FiX size={18} />
            </button>
          </div>
        )}
        
        {/* Form add/edit */}
        {formMode && (
          <div className="bg-[var(--bg-accent-dark)] p-6 rounded-lg mb-8 border border-[var(--accent-blue-glow)]/30">
            <h2 className="text-xl font-bold mb-4">
              {formMode === 'add' ? 'Thêm mới' : 'Chỉnh sửa'} Câu hỏi & Trả lời
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Câu hỏi</label>
                <input
                  type="text"
                  value={currentQA.question}
                  onChange={(e) => setCurrentQA({...currentQA, question: e.target.value})}
                  className="w-full bg-[var(--bg-darker)] border border-[var(--accent-blue-glow)]/30 rounded-lg p-3 text-white"
                  placeholder="Nhập câu hỏi..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Câu trả lời</label>
                <textarea
                  value={currentQA.answer}
                  onChange={(e) => setCurrentQA({...currentQA, answer: e.target.value})}
                  className="w-full bg-[var(--bg-darker)] border border-[var(--accent-blue-glow)]/30 rounded-lg p-3 text-white min-h-[150px]"
                  placeholder="Nhập câu trả lời..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-[var(--bg-darker)] text-white rounded-lg hover:bg-[var(--bg-dark)] transition-colors flex items-center gap-2"
                >
                  <FiX size={16} /> Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--accent-blue-bright)] text-white rounded-lg hover:bg-[var(--accent-blue-glow)] transition-colors flex items-center gap-2"
                >
                  <FiSave size={16} /> Lưu
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Add button */}
        {!formMode && (
          <button
            onClick={() => {
              setFormMode('add');
              setCurrentQA({ question: '', answer: '' });
            }}
            className="mb-6 px-4 py-2 bg-[var(--accent-blue-bright)] text-white rounded-lg hover:bg-[var(--accent-blue-glow)] transition-colors flex items-center gap-2"
          >
            <FiPlus size={16} /> Thêm mới
          </button>
        )}
        
        {/* QA list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-blue-bright)]"></div>
          </div>
        ) : qaList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--bg-accent-dark)] border-b border-[var(--accent-blue-glow)]/30">
                  <th className="p-3 text-left">Câu hỏi</th>
                  <th className="p-3 text-left">Câu trả lời</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {qaList.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--accent-blue-glow)]/10 hover:bg-[var(--bg-accent-dark)]/50 transition-colors">
                    <td className="p-3">{item.question}</td>
                    <td className="p-3">
                      <div className="max-h-20 overflow-y-auto custom-scrollbar">
                        {item.answer}
                      </div>
                    </td>
                    <td className="p-3 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setFormMode('edit');
                          setCurrentQA(item);
                        }}
                        className="p-2 bg-[var(--bg-darker)] text-[var(--accent-blue-bright)] rounded-lg hover:bg-[var(--bg-dark)] transition-colors"
                        title="Chỉnh sửa"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-[var(--bg-darker)] text-red-500 rounded-lg hover:bg-[var(--bg-dark)] transition-colors"
                        title="Xóa"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-[var(--bg-accent-dark)]/50 p-8 rounded-lg text-center">
            <p className="text-lg text-white/70">Chưa có dữ liệu câu hỏi & trả lời.</p>
          </div>
        )}
      </div>
    </div>
  );
} 