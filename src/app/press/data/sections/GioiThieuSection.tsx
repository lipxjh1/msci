import React from 'react';

export const GioiThieuSection = (
  <div className="space-y-8">
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Giới Thiệu</h3>
      <p className="text-white/80 mb-4 leading-relaxed">
        M-SCI là một tựa game bắn súng mobile được phát triển bởi đội ngũ nhà phát triển độc lập. 
        Đây là một tựa game được thiết kế để mang đến trải nghiệm hấp dẫn và độc đáo cho người chơi, 
        kết hợp giữa các yếu tố chiến thuật, hành động và nhập vai.
      </p>
      <p className="text-white/80 leading-relaxed">
        Lấy cảm hứng từ các thể loại game phổ biến như Overwatch và Valorant, 
        M-SCI mang đến một trải nghiệm chơi game cạnh tranh và đầy tính chiến thuật trên nền tảng di động.
      </p>
    </div>

    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/20 transition-all shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 font-rajdhani">Bối Cảnh Game</h3>
      <p className="text-white/80 mb-4 leading-relaxed">
        Câu chuyện của M-SCI diễn ra vào năm 2150, khi Trái Đất đang đối mặt với cuộc khủng hoảng không gian-thời gian 
        do sự xuất hiện của các sinh vật ngoài hành tinh. Các anh hùng đến từ nhiều nền văn hóa và quốc gia khác nhau 
        đã được triệu tập để thành lập một đội đặc nhiệm chống lại mối đe dọa ngoài hành tinh này.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
          <h4 className="text-white font-medium mb-2">Câu Chuyện Chính</h4>
          <p className="text-white/70 text-sm">
            Một tổ chức bí mật có tên M-SCI (Mobile Special Combat Initiative) 
            đã được thành lập với sứ mệnh bảo vệ Trái Đất khỏi các sinh vật ngoài hành tinh.
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
          <h4 className="text-white font-medium mb-2">Các Phe Phái</h4>
          <p className="text-white/70 text-sm">
            Người chơi có thể chọn phe Defenders (bảo vệ Trái Đất) hoặc Infiltrators (phe xâm lược)
            với những khả năng và tướng đặc trưng riêng.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/10 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all shadow-lg flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Game Đa Nền Tảng</h3>
        <p className="text-white/70 text-sm">
          M-SCI hỗ trợ đa nền tảng, cho phép người chơi từ Android và iOS cùng chơi với nhau.
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all shadow-lg flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Phát Triển Cộng Đồng</h3>
        <p className="text-white/70 text-sm">
          Cộng đồng người chơi là trọng tâm của chúng tôi, với các sự kiện thường xuyên và cập nhật theo đề xuất của người chơi.
        </p>
      </div>

      <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/10 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-lg flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Cập Nhật Thường Xuyên</h3>
        <p className="text-white/70 text-sm">
          Đội ngũ phát triển cam kết cập nhật nội dung mới hàng tháng, bao gồm anh hùng, bản đồ và chế độ chơi.
        </p>
      </div>
    </div>
  </div>
); 