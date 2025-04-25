'use client';

import Link from 'next/link';

export default function HowItWorksTab() {
  return (
    <div className="text-white animate-fadeIn">
      <h3 className="text-2xl font-bold mb-6 text-center">Cách Thức Hoạt Động</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-purple-400">1</span>
          </div>
          <h4 className="text-xl font-semibold mb-2">Chia sẻ mã giới thiệu</h4>
          <p className="text-gray-300">Chia sẻ mã giới thiệu cá nhân của bạn với bạn bè thông qua email, tin nhắn hoặc mạng xã hội.</p>
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-purple-400">2</span>
          </div>
          <h4 className="text-xl font-semibold mb-2">Bạn bè đăng ký</h4>
          <p className="text-gray-300">Bạn bè của bạn đăng ký tài khoản mới và nhập mã giới thiệu của bạn trong quá trình đăng ký.</p>
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-center">
          <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-purple-400">3</span>
          </div>
          <h4 className="text-xl font-semibold mb-2">Nhận phần thưởng</h4>
          <p className="text-gray-300">Cả bạn và người được giới thiệu đều nhận được phần thưởng hấp dẫn sau khi hoàn thành điều kiện.</p>
        </div>
      </div>
      
      <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-10">
        <h4 className="text-xl font-semibold mb-4">Điều kiện nhận thưởng</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>Người được giới thiệu phải là người chơi mới, chưa có tài khoản trước đó.</li>
          <li>Người được giới thiệu phải đạt cấp độ 10 trong game.</li>
          <li>Người được giới thiệu phải thực hiện ít nhất một lần nạp tiền trong game.</li>
          <li>Mỗi tài khoản chỉ được sử dụng một mã giới thiệu.</li>
          <li>Phần thưởng sẽ được cộng vào tài khoản trong vòng 24 giờ sau khi đáp ứng điều kiện.</li>
        </ul>
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => {
            const element = document.querySelector('button[data-tab="my-referrals"]') as HTMLButtonElement;
            if (element) element.click();
          }}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded transition-colors duration-300 uppercase"
        >
          Lấy mã giới thiệu của bạn
        </button>
      </div>
    </div>
  );
} 