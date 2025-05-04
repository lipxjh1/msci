"use client";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes, FaLightbulb, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
          
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 border border-gray-700 shadow-xl rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title as="h3" className="text-2xl font-bold text-white flex items-center">
                  <FaInfoCircle className="text-indigo-400 mr-3" />
                  Hướng dẫn cách chơi
                </Dialog.Title>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white focus:outline-none"
                  onClick={onClose}
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-6">
                <div className="bg-gray-800/70 rounded-xl p-5 border border-gray-700/70">
                  <h4 className="text-xl font-medium text-white mb-4 flex items-center">
                    <span className="text-yellow-400 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Cách chơi
                  </h4>
                  <ul className="text-white/80 space-y-3 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Kết nối các cặp biểu tượng giống nhau bằng các đường thẳng (tối đa 3 đoạn)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Khi kết nối thành công, cả hai biểu tượng sẽ biến mất</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Mục tiêu là xóa tất cả các biểu tượng càng nhanh càng tốt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Mỗi cấp độ sẽ trở nên khó khăn hơn với nhiều biểu tượng hơn</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/70 rounded-xl p-5 border border-gray-700/70">
                  <h4 className="text-xl font-medium text-white mb-4 flex items-center">
                    <span className="text-yellow-400 mr-2">
                      <FaLightbulb />
                    </span>
                    Mẹo chơi game
                  </h4>
                  <ul className="text-white/80 space-y-3 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Bắt đầu từ các cạnh để kết nối dễ dàng hơn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Chế độ toàn màn hình cho phép bạn nhìn thấy bàn chơi lớn hơn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Cố gắng vượt qua thời gian tốt nhất của bạn trong mỗi cấp độ!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                      <span>Nếu bạn không thể tìm thấy đường kết nối, hãy thử chọn một cặp khác</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg"
                >
                  Đã hiểu, trở lại trò chơi!
                </motion.button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default HelpModal; 