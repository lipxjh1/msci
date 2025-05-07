"use client";

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle, FaQuestion, FaInfoCircle, FaCreditCard, FaCoins } from 'react-icons/fa';

export default function ThongTinDonatePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 overflow-hidden py-8">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"></div>
      <div className="absolute inset-0 bg-[url('/images/particle_overlay.png')] opacity-10 z-0"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/donate">
            <button className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
              <FaArrowLeft className="mr-2" />
              <span>Quay lại trang Donate</span>
            </button>
          </Link>
        </div>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-6">
            HƯỚNG DẪN CHI TIẾT VỀ <span className="text-cyan-400">ĐÓNG GÓP</span> CHO DỰ ÁN M-SCI
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Thông qua việc donate, bạn không chỉ đơn thuần hỗ trợ tài chính cho dự án mà còn trở thành một phần của 
            hành trình kiến tạo lịch sử game Việt Nam. Mỗi đóng góp, dù lớn hay nhỏ, đều có ý nghĩa quan trọng đối với chúng tôi.
          </p>
        </motion.div>
        
        {/* Main content in a paper-like design */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl mb-12 border border-gray-700">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* About M-SCI */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FaInfoCircle className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">GIỚI THIỆU VỀ M-SCI</h2>
              </div>
              <div className="ml-9">
                <p>
                  M-SCI là một dự án game đầy tham vọng được phát triển bởi đội ngũ người Việt Nam, với mục tiêu đưa game Việt Nam vươn tầm quốc tế. 
                  Chúng tôi đang xây dựng một tựa game hành động-sinh tồn thế giới mở với công nghệ tiên tiến, cốt truyện sâu sắc và gameplay sáng tạo.
                </p>
              </div>
            </section>
            
            {/* Why donate */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FaQuestion className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">TẠI SAO NÊN DONATE CHO M-SCI?</h2>
              </div>
              <div className="ml-9">
                <ul className="space-y-4">
                  <li className="flex">
                    <FaCheckCircle className="text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Hỗ trợ phát triển game Việt Nam:</strong> Đóng góp của bạn giúp chúng tôi tạo ra một tựa game 
                      chất lượng cao, đại diện cho tiềm năng của ngành công nghiệp game Việt Nam.
                    </div>
                  </li>
                  <li className="flex">
                    <FaCheckCircle className="text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Nhận quyền lợi độc quyền:</strong> Những người donate sẽ nhận được nhiều quyền lợi đặc biệt, 
                      từ vật phẩm in-game đến cơ hội tham gia vào quá trình phát triển game.
                    </div>
                  </li>
                  <li className="flex">
                    <FaCheckCircle className="text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Tham gia cộng đồng tiên phong:</strong> Bạn sẽ gia nhập cộng đồng những người ủng hộ đầu tiên, có 
                      cơ hội giao lưu với đội ngũ phát triển và những người chơi đam mê khác.
                    </div>
                  </li>
                  <li className="flex">
                    <FaCheckCircle className="text-cyan-400 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Góp phần vào tầm nhìn lớn:</strong> Mỗi đóng góp đều giúp hiện thực hóa tầm nhìn đưa game Việt Nam 
                      vươn tầm quốc tế.
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            
            {/* Donation packages */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FaCoins className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">CÁC GÓI DONATE</h2>
              </div>
              <div className="ml-9">
                <h3 className="text-xl text-cyan-400 font-bold mb-4">GÓI CƠ BẢN</h3>
                
                <div className="space-y-8 mb-8">
                  <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-2">1. Supporter Pack - 99,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>Huy hiệu "Early Supporter"</li>
                      <li>1,000 M-Coin (đơn vị tiền tệ trong game)</li>
                      <li>Tên của bạn sẽ được ghi trong "Bảng Vàng Tri Ân"</li>
                      <li>Quyền truy cập vào kênh Discord riêng của người ủng hộ</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-2">2. Friend Pack - 299,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>3,000 M-Coin</li>
                      <li>Battle Pass 1 mùa</li>
                      <li>Skin "Pioneer" độc quyền</li>
                      <li>Discord role "Founding Friend"</li>
                      <li>Quyền ưu tiên tham gia các sự kiện beta</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-2">3. Hero Pack - 599,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>6,000 M-Coin</li>
                      <li>Battle Pass Premium</li>
                      <li>2 Hero cấp A</li>
                      <li>Khung avatar "Hero's Journey"</li>
                      <li>Quyền tham gia khảo sát độc quyền</li>
                      <li>Early access vào các phiên bản thử nghiệm</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-2">4. Legend Pack - 999,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>10,000 M-Coin</li>
                      <li>Battle Pass Lifetime</li>
                      <li>4 Hero bất kỳ</li>
                      <li>Skin "Legend" độc quyền</li>
                      <li>Tên trong credits của game</li>
                      <li>Quyền truy cập vào các buổi họp định kỳ với đội phát triển</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                    <h4 className="text-lg font-bold text-white mb-2">5. Founder Pack - 2,999,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>30,000 M-Coin</li>
                      <li>Vĩnh viễn được miễn phí tất cả Battle Pass</li>
                      <li>Tất cả hero và skin ra mắt trong năm đầu tiên</li>
                      <li>Quyền phát triển ý tưởng về một vật phẩm trong game</li>
                      <li>Huy hiệu "Founding Member" độc quyền</li>
                      <li>Họp trực tiếp với đội ngũ phát triển mỗi quý</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl text-cyan-400 font-bold mb-4">GÓI CAO CẤP (PREMIUM)</h3>
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-cyan-800/50">
                    <h4 className="text-lg font-bold text-white mb-2">6. Investor Pack - 9,999,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>100,000 M-Coin</li>
                      <li>Truy cập vĩnh viễn vào tất cả nội dung trả phí</li>
                      <li>Quyền đặt tên một địa điểm trong game</li>
                      <li>Phiên bản vật lý đặc biệt của game (có chữ ký của đội phát triển)</li>
                      <li>Tham gia các buổi họp chiến lược với đội ngũ lãnh đạo</li>
                      <li>Huy hiệu "Early Investor" độc quyền</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-6 rounded-xl border border-purple-800/50">
                    <h4 className="text-lg font-bold text-white mb-2">7. Partner Pack - 49,999,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>500,000 M-Coin</li>
                      <li>Quyền tham gia vào việc thiết kế một nhân vật hoặc nhiệm vụ trong game</li>
                      <li>Tên và logo (nếu có) sẽ xuất hiện trong credits dưới mục "Official Partners"</li>
                      <li>Tham dự các sự kiện ra mắt game VIP</li>
                      <li>Được mời tham gia các buổi thuyết trình về chiến lược phát triển game</li>
                      <li>Chuyến thăm studio (chi phí di chuyển không bao gồm)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 p-6 rounded-xl border border-amber-800/50">
                    <h4 className="text-lg font-bold text-white mb-2">8. VIP Investor Pack - 99,999,000 VNĐ</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-300">
                      <li>1,000,000 M-Coin</li>
                      <li>Tham gia vào việc thiết kế và phát triển một khu vực trong game</li>
                      <li>Được công nhận là "VIP Investor" trên tất cả các kênh truyền thông chính thức</li>
                      <li>Gặp gỡ riêng với đội ngũ lãnh đạo và tham gia vào các quyết định chiến lược</li>
                      <li>Phần trăm doanh thu từ các giao dịch in-game (theo thỏa thuận riêng)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Donation process */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FaCreditCard className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">QUY TRÌNH DONATE</h2>
              </div>
              <div className="ml-9">
                <ol className="list-decimal pl-5 space-y-4">
                  <li className="text-gray-300">
                    <strong className="text-white">Lựa chọn gói donate</strong> phù hợp với khả năng và mong muốn của bạn
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">Thực hiện thanh toán</strong> thông qua các phương thức được hỗ trợ:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Thẻ tín dụng/ghi nợ quốc tế (Visa, MasterCard, JCB)</li>
                      <li>Ví điện tử (MoMo, ZaloPay, VNPay)</li>
                      <li>Chuyển khoản ngân hàng</li>
                      <li>Tiền điện tử (Bitcoin, Ethereum)</li>
                    </ul>
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">Xác nhận thanh toán</strong> - Sau khi thanh toán thành công, bạn sẽ nhận được email xác nhận
                  </li>
                  <li className="text-gray-300">
                    <strong className="text-white">Kích hoạt quyền lợi</strong> - Các quyền lợi của gói donate sẽ được kích hoạt trong vòng 24-48 giờ
                  </li>
                </ol>
              </div>
            </section>
            
            {/* Refund policy */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FaInfoCircle className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">CHÍNH SÁCH HOÀN TIỀN</h2>
              </div>
              <div className="ml-9">
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Hoàn tiền 100% trong vòng 7 ngày nếu bạn chưa sử dụng bất kỳ quyền lợi nào</li>
                  <li>Hoàn tiền một phần (tùy theo thời gian và quyền lợi đã sử dụng) trong vòng 30 ngày</li>
                  <li>Không hoàn tiền sau 30 ngày kể từ ngày donate</li>
                </ul>
              </div>
            </section>
            
            {/* FAQ */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FaQuestion className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">CÂU HỎI THƯỜNG GẶP</h2>
              </div>
              <div className="ml-9 space-y-6">
                <div>
                  <p className="font-bold text-white mb-2">Q: Tiền donate của tôi sẽ được sử dụng vào đâu?</p>
                  <p className="text-gray-300">A: Tiền donate sẽ được sử dụng trực tiếp vào việc phát triển game, bao gồm: thuê nhân lực, cải thiện cơ sở hạ tầng, marketing và tổ chức sự kiện cộng đồng.</p>
                </div>
                
                <div>
                  <p className="font-bold text-white mb-2">Q: Tôi sẽ nhận được quyền lợi khi nào?</p>
                  <p className="text-gray-300">A: Các quyền lợi kỹ thuật số sẽ được kích hoạt trong vòng 24-48 giờ sau khi thanh toán thành công. Các quyền lợi vật lý (nếu có) sẽ được gửi trong vòng 30 ngày.</p>
                </div>
                
                <div>
                  <p className="font-bold text-white mb-2">Q: Tôi có thể nâng cấp gói donate không?</p>
                  <p className="text-gray-300">A: Có, bạn có thể nâng cấp gói donate bất kỳ lúc nào bằng cách thanh toán phần chênh lệch giữa gói hiện tại và gói mới.</p>
                </div>
                
                <div>
                  <p className="font-bold text-white mb-2">Q: Nếu game không ra mắt, tôi có được hoàn tiền không?</p>
                  <p className="text-gray-300">A: Trong trường hợp dự án không thể tiếp tục phát triển, chúng tôi sẽ hoàn trả một phần tiền donate dựa trên tình hình tài chính của dự án và các quyền lợi bạn đã nhận được.</p>
                </div>
                
                <div>
                  <p className="font-bold text-white mb-2">Q: Các quyền lợi có thời hạn không?</p>
                  <p className="text-gray-300">A: Một số quyền lợi có thời hạn cụ thể (như Battle Pass theo mùa), một số khác là vĩnh viễn. Chi tiết về thời hạn được ghi rõ trong mô tả của từng gói.</p>
                </div>
              </div>
            </section>
            
            {/* Contact support */}
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <FaInfoCircle className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">LIÊN HỆ HỖ TRỢ</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-300 mb-4">
                  Nếu bạn có bất kỳ câu hỏi nào về việc donate hoặc gặp vấn đề trong quá trình thanh toán, 
                  vui lòng liên hệ với chúng tôi qua:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li><strong className="text-white">Email:</strong> support@m-sci.vn</li>
                  <li><strong className="text-white">Discord:</strong> https://discord.gg/m-sci</li>
                  <li><strong className="text-white">Hotline:</strong> 1900-xxxx (7:00 - 22:00, T2-CN)</li>
                </ul>
              </div>
            </section>
            
            {/* Thank you note */}
            <section>
              <div className="flex items-center mb-4">
                <FaInfoCircle className="text-cyan-400 text-2xl mr-3" />
                <h2 className="font-orbitron text-2xl text-white m-0">LỜI CẢM ƠN</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-300 mb-4">
                  Chúng tôi xin chân thành cảm ơn sự hỗ trợ của bạn. Mỗi đóng góp đều là một động lực to lớn giúp chúng tôi tiếp tục phát triển 
                  và hoàn thiện M-SCI. Chúng tôi cam kết sẽ không ngừng nỗ lực để tạo ra một tựa game xuất sắc, xứng đáng với niềm tin và sự ủng hộ 
                  của cộng đồng.
                </p>
                <p className="text-gray-300 font-bold">
                  Cùng nhau, chúng ta sẽ kiến tạo nên tương lai mới cho game Việt Nam!
                </p>
              </div>
            </section>
          </div>
        </div>
        
        {/* CTA button */}
        <div className="text-center mb-16">
          <Link href="/donate/premium-packages">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300">
              Donate Ngay
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
} 