"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegCreditCard, FaQrcode, FaPaypal, FaMobileAlt, FaTimes, FaCheckCircle, FaCopy } from 'react-icons/fa';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: {
    id: string;
    title: string;
    price: string;
    description: string;
  } | null;
}

const PAYMENT_METHODS = [
  { id: 'banking', name: 'Chuyển khoản ngân hàng', icon: <FaRegCreditCard className="text-blue-500" /> },
  { id: 'momo', name: 'Ví MoMo', icon: <FaMobileAlt className="text-pink-500" /> },
  { id: 'zalopay', name: 'Ví ZaloPay', icon: <FaQrcode className="text-blue-600" /> },
  { id: 'paypal', name: 'PayPal', icon: <FaPaypal className="text-blue-700" /> },
];

const BANK_INFO = {
  name: 'NGUYEN VAN A',
  bankName: 'Vietcombank',
  accountNumber: '1234567890',
  branch: 'Hồ Chí Minh',
  content: 'MSCI-'
};

export default function PaymentModal({ isOpen, onClose, selectedPackage }: PaymentModalProps) {
  const [activeMethod, setActiveMethod] = useState('banking');
  const [isCopied, setIsCopied] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleMockPayment = () => {
    // Mock payment process
    setIsPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentSuccess(false);
      onClose();
    }, 3000);
  };

  if (!selectedPackage) return null;

  const transferContent = `${BANK_INFO.content}${selectedPackage.id.toUpperCase()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl mx-4 z-10 relative overflow-hidden"
          >
            {/* Success overlay */}
            <AnimatePresence>
              {isPaymentSuccess && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gray-900/95 flex flex-col items-center justify-center z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                  </motion.div>
                  <h3 className="text-white text-2xl font-bold mb-2">Thanh toán thành công!</h3>
                  <p className="text-gray-300 mb-6">Gói {selectedPackage.title} đã được kích hoạt</p>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                  >
                    Đóng
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="border-b border-gray-700 p-4 flex justify-between items-center">
              <h3 className="text-xl font-orbitron text-white">Thanh toán</h3>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Package info */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Gói đã chọn:</span>
                  <span className="font-bold text-cyan-400">{selectedPackage.title}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Giá:</span>
                  <span className="font-bold text-white">{selectedPackage.price}</span>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {selectedPackage.description}
                </div>
              </div>
              
              {/* Payment methods */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Chọn phương thức thanh toán:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setActiveMethod(method.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                        activeMethod === method.id 
                          ? 'bg-cyan-500/20 border border-cyan-500' 
                          : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <span className={`text-sm ${activeMethod === method.id ? 'text-white' : 'text-gray-300'}`}>
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Payment details */}
              <div className="bg-gray-800 rounded-lg p-4">
                {activeMethod === 'banking' && (
                  <div>
                    <h4 className="text-white font-semibold mb-3">Thông tin chuyển khoản:</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Ngân hàng:</span>
                        <span className="text-white">{BANK_INFO.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Số tài khoản:</span>
                        <div className="flex items-center">
                          <span className="text-white">{BANK_INFO.accountNumber}</span>
                          <button 
                            onClick={() => copyToClipboard(BANK_INFO.accountNumber)}
                            className="ml-2 text-cyan-400 hover:text-cyan-300"
                          >
                            <FaCopy />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Chủ tài khoản:</span>
                        <span className="text-white">{BANK_INFO.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Chi nhánh:</span>
                        <span className="text-white">{BANK_INFO.branch}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-300">Nội dung chuyển khoản:</span>
                        <div className="flex items-center">
                          <span className="text-cyan-400">{transferContent}</span>
                          <button 
                            onClick={() => copyToClipboard(transferContent)}
                            className="ml-2 text-cyan-400 hover:text-cyan-300"
                          >
                            <FaCopy />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {isCopied && (
                      <div className="text-green-400 text-center text-sm mb-2">
                        Đã sao chép vào clipboard!
                      </div>
                    )}
                    
                    <div className="bg-gray-700/50 p-3 rounded-lg text-gray-300 text-sm mb-4">
                      <p>Vui lòng chuyển khoản chính xác số tiền và nội dung để việc xác nhận được thực hiện nhanh chóng.</p>
                    </div>
                  </div>
                )}
                
                {activeMethod === 'momo' && (
                  <div className="text-center">
                    <h4 className="text-white font-semibold mb-3">Quét mã QR để thanh toán qua MoMo:</h4>
                    <div className="bg-white p-4 rounded-lg inline-block mx-auto mb-3">
                      <div className="w-48 h-48 relative mx-auto">
                        <Image
                          src="/images/qr-momo-demo.png"
                          alt="MoMo QR Code"
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm">
                      Hoặc chuyển khoản đến số điện thoại: <span className="text-white font-semibold">0123456789</span>
                    </div>
                    <div className="text-gray-300 text-sm mt-2">
                      Nội dung chuyển khoản: <span className="text-cyan-400 font-semibold">{transferContent}</span>
                    </div>
                  </div>
                )}
                
                {activeMethod === 'zalopay' && (
                  <div className="text-center">
                    <h4 className="text-white font-semibold mb-3">Quét mã QR để thanh toán qua ZaloPay:</h4>
                    <div className="bg-white p-4 rounded-lg inline-block mx-auto mb-3">
                      <div className="w-48 h-48 relative mx-auto">
                        <Image
                          src="/images/qr-zalopay-demo.png"
                          alt="ZaloPay QR Code"
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mt-2">
                      Nội dung chuyển khoản: <span className="text-cyan-400 font-semibold">{transferContent}</span>
                    </div>
                  </div>
                )}
                
                {activeMethod === 'paypal' && (
                  <div className="text-center">
                    <h4 className="text-white font-semibold mb-4">Thanh toán qua PayPal:</h4>
                    <button 
                      onClick={handleMockPayment}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-colors"
                    >
                      <FaPaypal className="mr-2" />
                      <span>Thanh toán với PayPal</span>
                    </button>
                    <div className="text-gray-400 text-sm mt-4">
                      Bạn sẽ được chuyển hướng đến trang thanh toán an toàn của PayPal
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-700 p-4 flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              
              {activeMethod !== 'paypal' && (
                <button
                  onClick={handleMockPayment}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                >
                  Đã thanh toán
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 