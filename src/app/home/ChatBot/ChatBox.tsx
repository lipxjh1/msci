import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiSend, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "M-SCI là gì?",
  "Làm thế nào để chơi game này?",
  "Có bao nhiêu anh hùng trong game?",

];

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào! Tôi là Akane, chiến binh M-SCI. Tôi có thể giúp gì cho bạn?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageToSend: string = inputMessage) => {
    if (!messageToSend.trim()) return;
    
    const userMessage: Message = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      console.log("Sending request to API with message:", messageToSend);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          chatHistory: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });
      
      if (!response.ok) {
        console.error(
          "API response not OK:",
          response.status,
          response.statusText
        );
        throw new Error("Lỗi kết nối API: " + response.status);
      }
      
      const data = await response.json();
      console.log("API response received:", data);
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || "Không nhận được phản hồi từ server.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Xin lỗi, có lỗi xảy ra: " +
          (error instanceof Error ? error.message : "Lỗi không xác định"),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-4 z-50">
      {/* Character and Chat Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.3 }}
        className="relative"
      >
        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="absolute bottom-[140px] right-0 w-80 sm:w-96 bg-[var(--bg-accent-dark)] border border-[var(--accent-blue-glow)] rounded-xl shadow-2xl overflow-hidden flex flex-col"
              style={{
                height: "min(600px, calc(100vh - 180px))",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[var(--bg-dark)] to-[var(--bg-accent-dark)] p-4 flex items-center border-b border-[var(--accent-blue-glow)]/30">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--accent-blue-bright)]">
                  <Image
                    src="/images/heroes/ava_chatbot.png"
                    alt="Akane"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-white font-bold">Akane</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_4px_rgba(49,162,76,0.6)]"></div>
                    <p className="text-xs text-[var(--accent-blue-bright)]">
                      Chiến binh M-SCI
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-[var(--bg-darker)] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX size={20} className="text-white" />
                </motion.button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[var(--accent-blue-glow)] scrollbar-track-[var(--bg-darker)]">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-4 flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-[var(--accent-blue-bright)]/20 text-white border border-[var(--accent-blue-bright)]/30"
                          : "bg-[var(--bg-darker)] text-white border border-[var(--accent-blue-glow)]/30"
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}

                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-4"
                  >
                    <p className="text-sm text-[var(--accent-blue-bright)] mb-2">Câu hỏi thường gặp:</p>
                    <div className="space-y-2">
                      {suggestedQuestions.map((question, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => {
                            void handleSendMessage(question);
                          }}
                          className="w-full text-left p-2 rounded-lg bg-[var(--bg-darker)]/50 hover:bg-[var(--bg-darker)] text-sm text-white border border-[var(--accent-blue-glow)]/30 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-4"
                  >
                    <div className="bg-[var(--bg-darker)] text-white border border-[var(--accent-blue-glow)]/30 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-blue-bright)] animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-blue-bright)] animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-blue-bright)] animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-[var(--accent-blue-glow)]/30 bg-[var(--bg-darker)]">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && void handleSendMessage()}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 bg-[var(--bg-accent-dark)] text-white border border-[var(--accent-blue-glow)]/30 rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue-bright)]"
                  />
                  <button
                    onClick={() => void handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-[var(--accent-blue-bright)] text-white p-2 rounded-r-lg disabled:opacity-50 hover:bg-[var(--accent-blue-glow)] transition-colors"
                  >
                    <FiSend size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Image and Chat Toggle */}
        <motion.div
          className="relative cursor-pointer"
          onClick={() => !isOpen && setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-32 h-32">
            <Image
              src="/images/heroes/ui 6.png"
              alt="Chat Bot"
              fill
              className="object-contain"
              sizes="128px"
            />
          </div>
          
          {/* Help Message Bubble */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 20 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-12 right-0 bg-white dark:bg-[var(--bg-darker)] p-2 rounded-xl shadow-lg"
              >
                <p className="text-sm whitespace-nowrap text-[var(--accent-blue-bright)]">
                  Bạn cần giúp đỡ?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Badge */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
              >
                1
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
