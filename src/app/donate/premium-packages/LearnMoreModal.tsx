"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHandshake, FaGamepad, FaGlobe, FaRegLightbulb, FaBookOpen } from 'react-icons/fa';
import Image from 'next/image';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
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
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-32 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/images/grid_pattern.svg')] opacity-20"></div>
                
                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-6">
                  <div>
                    <h2 className="font-orbitron text-white text-3xl font-bold">
                      Chương Trình Donate
                    </h2>
                    <p className="text-white/80">Đồng hành cùng M-SCI phát triển game Việt Nam</p>
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
              <div className="p-6 space-y-8">
                {/* Introduction */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Về Chương Trình</h3>
                  <p className="text-gray-300 mb-4">
                    Chương trình Donate của M-SCI là một cách để cộng đồng game thủ và những người yêu thích trò chơi điện tử 
                    có thể trực tiếp góp phần vào sự phát triển của làng game Việt Nam. Mọi đóng góp đều có ý nghĩa quan trọng 
                    trong việc nâng tầm chất lượng và quy mô của các dự án game Việt.
                  </p>
                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <FaRegLightbulb className="text-yellow-400 text-xl mt-1 mr-3" />
                      <p className="text-gray-300">
                        Chúng tôi tin rằng cùng nhau, chúng ta có thể tạo ra những tựa game chất lượng, mang dấu ấn 
                        văn hóa Việt Nam nhưng vẫn đạt chuẩn quốc tế.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Quyền Lợi Nhà Ủng Hộ</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/70 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="bg-cyan-500/20 p-2 rounded-lg mr-3">
                          <FaGamepad className="text-cyan-400" />
                        </div>
                        <h4 className="text-white font-semibold">Truy cập sớm</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Người ủng hộ sẽ được truy cập sớm vào các tính năng, bản demo và phiên bản thử nghiệm
                        trước khi được phát hành rộng rãi.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/70 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
                          <FaBookOpen className="text-purple-400" />
                        </div>
                        <h4 className="text-white font-semibold">Tham gia phát triển</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Được đóng góp ý kiến và ảnh hưởng trực tiếp đến quá trình phát triển sản phẩm 
                        thông qua các cuộc khảo sát và diễn đàn đặc biệt.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/70 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="bg-green-500/20 p-2 rounded-lg mr-3">
                          <FaHandshake className="text-green-400" />
                        </div>
                        <h4 className="text-white font-semibold">Cộng đồng exclusive</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Trở thành thành viên của cộng đồng nhà ủng hộ với các kênh chat riêng, 
                        sự kiện đặc biệt và cơ hội gặp gỡ team phát triển.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/70 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg mr-3">
                          <FaGlobe className="text-amber-400" />
                        </div>
                        <h4 className="text-white font-semibold">Góp phần vào lịch sử</h4>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Tên của bạn sẽ được ghi nhận trong danh sách những người đóng góp cho sự phát triển 
                        của game Việt Nam, được hiển thị trong credits của game.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* How it works */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Cách Thức Hoạt Động</h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Chọn gói ủng hộ</h4>
                        <p className="text-gray-300">
                          Lựa chọn gói ủng hộ phù hợp với khả năng và mong muốn của bạn, từ Starter Pack đến Diamond Benefactor.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Thanh toán an toàn</h4>
                        <p className="text-gray-300">
                          Thực hiện thanh toán qua các phương thức bảo mật gồm thẻ tín dụng, ví điện tử, chuyển khoản ngân hàng.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Nhận quyền lợi ngay lập tức</h4>
                        <p className="text-gray-300">
                          Sau khi thanh toán thành công, bạn sẽ nhận được email xác nhận cùng thông tin về các quyền lợi đã mở khóa.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Đồng hành cùng sự phát triển</h4>
                        <p className="text-gray-300">
                          Trở thành một phần của hành trình phát triển game Việt Nam, đón nhận các cập nhật đặc quyền.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* FAQ */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Câu Hỏi Thường Gặp</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Tiền donate được sử dụng cho mục đích gì?</h4>
                      <p className="text-gray-300 text-sm">
                        Toàn bộ số tiền donate sẽ được dùng để phát triển game, bao gồm chi phí nhân sự, công nghệ, 
                        marketing và các hoạt động xây dựng cộng đồng game thủ Việt Nam.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Làm thế nào để nâng cấp gói donate?</h4>
                      <p className="text-gray-300 text-sm">
                        Bạn có thể nâng cấp gói donate hiện tại bằng cách chỉ thanh toán phần chênh lệch giữa gói mới 
                        và gói hiện tại. Vui lòng liên hệ support@m-sci.io để được hướng dẫn.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Tôi có thể donate dưới danh nghĩa công ty/tổ chức không?</h4>
                      <p className="text-gray-300 text-sm">
                        Hoàn toàn có thể! Chúng tôi có các gói đối tác dành riêng cho doanh nghiệp với nhiều quyền lợi đặc biệt. 
                        Liên hệ partner@m-sci.io để tìm hiểu thêm.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-800 p-6 flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                  <p>Có thắc mắc? <span className="text-cyan-400">support@m-sci.io</span></p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg transition-colors"
                >
                  Đã hiểu
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LearnMoreModal; 