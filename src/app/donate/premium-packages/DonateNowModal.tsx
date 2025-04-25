"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheck, FaSpinner, FaCreditCard, FaQrcode, FaPaypal, FaGift } from 'react-icons/fa';
import Image from 'next/image';

interface DonateNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: {
    id: string;
    title: string;
    price: string;
    description: string;
  } | null;
}

const DonateNowModal: React.FC<DonateNowModalProps> = ({ isOpen, onClose, package: selectedPackage }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập thanh toán
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Đóng modal sau 3 giây khi thành công
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-28 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/images/grid_pattern.svg')] opacity-20"></div>
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 relative mr-4 rounded-full bg-white/10 flex items-center justify-center">
                      <Image 
                        src="/images/overwatch_logo.png" 
                        alt="M-SCI Logo" 
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <h2 className="font-orbitron text-white text-2xl font-bold">
                      {selectedPackage?.title || 'Donate Ngay'}
                    </h2>
                  </div>
                  
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <FaCheck className="text-green-500 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Cảm ơn bạn!</h3>
                    <p className="text-gray-300 mb-2">
                      Thanh toán của bạn đã được xử lý thành công.
                    </p>
                    <p className="text-cyan-400">
                      Mã giao dịch: M-SCI-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Package details */}
                    <div className="mb-6 p-5 bg-gray-800/50 rounded-xl">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white font-bold">{selectedPackage?.title}</h3>
                        <span className="text-cyan-400 font-bold">{selectedPackage?.price}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{selectedPackage?.description}</p>
                    </div>
                    
                    {/* Payment methods */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-3">Phương thức thanh toán</h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <button
                          type="button"
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                            paymentMethod === 'credit-card' 
                              ? 'border-cyan-500 bg-cyan-900/20' 
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                          onClick={() => setPaymentMethod('credit-card')}
                        >
                          <FaCreditCard className={`text-2xl mb-2 ${paymentMethod === 'credit-card' ? 'text-cyan-400' : 'text-gray-400'}`} />
                          <span className={`text-sm ${paymentMethod === 'credit-card' ? 'text-cyan-400' : 'text-gray-300'}`}>Thẻ Visa/Master</span>
                        </button>
                        
                        <button
                          type="button"
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                            paymentMethod === 'qr-code' 
                              ? 'border-cyan-500 bg-cyan-900/20' 
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                          onClick={() => setPaymentMethod('qr-code')}
                        >
                          <FaQrcode className={`text-2xl mb-2 ${paymentMethod === 'qr-code' ? 'text-cyan-400' : 'text-gray-400'}`} />
                          <span className={`text-sm ${paymentMethod === 'qr-code' ? 'text-cyan-400' : 'text-gray-300'}`}>Momo/ZaloPay</span>
                        </button>
                        
                        <button
                          type="button"
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                            paymentMethod === 'paypal' 
                              ? 'border-cyan-500 bg-cyan-900/20' 
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                          onClick={() => setPaymentMethod('paypal')}
                        >
                          <FaPaypal className={`text-2xl mb-2 ${paymentMethod === 'paypal' ? 'text-cyan-400' : 'text-gray-400'}`} />
                          <span className={`text-sm ${paymentMethod === 'paypal' ? 'text-cyan-400' : 'text-gray-300'}`}>PayPal</span>
                        </button>
                        
                        <button
                          type="button"
                          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                            paymentMethod === 'gift-code' 
                              ? 'border-cyan-500 bg-cyan-900/20' 
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                          onClick={() => setPaymentMethod('gift-code')}
                        >
                          <FaGift className={`text-2xl mb-2 ${paymentMethod === 'gift-code' ? 'text-cyan-400' : 'text-gray-400'}`} />
                          <span className={`text-sm ${paymentMethod === 'gift-code' ? 'text-cyan-400' : 'text-gray-300'}`}>Gift Code</span>
                        </button>
                      </div>
                      
                      {/* Payment form - với nội dung thay đổi theo phương thức */}
                      <div className="mb-6">
                        {paymentMethod === 'credit-card' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-300 text-sm mb-1">Số thẻ</label>
                              <input
                                type="text"
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                placeholder="1234 5678 9012 3456"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">Ngày hết hạn</label>
                                <input
                                  type="text"
                                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-300 text-sm mb-1">CVV</label>
                                <input
                                  type="text"
                                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                  placeholder="123"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === 'qr-code' && (
                          <div className="flex flex-col items-center">
                            <p className="text-gray-300 mb-4">Quét mã QR bằng ứng dụng Momo hoặc ZaloPay để thanh toán</p>
                            <div className="bg-white p-4 rounded-xl w-48 h-48 flex items-center justify-center">
                              <Image
                                src="/images/qr-momo-demo.png"
                                alt="QR Code"
                                width={160}
                                height={160}
                              />
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === 'paypal' && (
                          <div className="flex flex-col items-center">
                            <p className="text-gray-300 mb-4">Bạn sẽ được chuyển hướng đến trang thanh toán PayPal</p>
                            <button
                              type="button"
                              className="bg-[#0070ba] hover:bg-[#003087] text-white font-bold py-2 px-4 rounded-lg transition-colors w-full max-w-md"
                            >
                              Thanh toán với PayPal
                            </button>
                          </div>
                        )}
                        
                        {paymentMethod === 'gift-code' && (
                          <div>
                            <label className="block text-gray-300 text-sm mb-1">Nhập Gift Code</label>
                            <input
                              type="text"
                              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              placeholder="MSCI-XXXX-XXXX-XXXX"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                        disabled={isSubmitting}
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all flex items-center justify-center min-w-[120px]"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Đang xử lý...
                          </>
                        ) : 'Donate Ngay'}
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {/* Footer */}
              {!isSuccess && (
                <div className="border-t border-gray-800 p-4">
                  <div className="flex items-center justify-center text-sm">
                    <span className="text-gray-400 mr-2">Thanh toán an toàn qua:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#1434CB]">Visa</span>
                      <span className="text-[#EB001B]">Master</span>
                      <span className="text-[#00A1DF]">PayPal</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DonateNowModal; 