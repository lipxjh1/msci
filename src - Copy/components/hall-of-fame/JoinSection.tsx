import React from 'react';
import Link from 'next/link';

const JoinSection: React.FC = () => {
  return (
    <section id="join" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg border-l-4 border-r-4 border-blue-600">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Tham Gia Cộng Đồng M-SCI
            </h2>
            
            <p className="text-gray-400 mb-6">
              Trở thành một phần của lịch sử game và cùng viết tiếp hành trình. 
              Vinh danh dành cho những người dám dấn thân.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Giải Đấu',
                description: 'Tham gia các giải đấu hàng tháng với giải thưởng giá trị'
              },
              {
                title: 'Kết Nối',
                description: 'Kết nối với những người chơi hàng đầu từ khắp nơi trên thế giới'
              },
              {
                title: 'Vinh Danh',
                description: 'Cơ hội được ghi danh vào Đại Sảnh Danh Vọng của M-SCI'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-4 rounded"
              >
                <h3 className="text-lg font-bold text-blue-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link 
              href="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded text-center transition-colors"
            >
              Đăng Ký Ngay
            </Link>
            <Link 
              href="/community" 
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-2 px-6 rounded text-center transition-colors"
            >
              Khám Phá Cộng Đồng
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">Đã có hơn 10 triệu người chơi đăng ký</p>
        </div>
      </div>
    </section>
  );
};

export default JoinSection; 