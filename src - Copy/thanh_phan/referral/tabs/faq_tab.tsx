'use client';

import { useState } from 'react';
import { FaQuestion, FaAngleDown } from 'react-icons/fa';

export default function FAQTab() {
  // State để theo dõi câu hỏi được mở
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Danh sách câu hỏi thường gặp
  const faqItems = [
    {
      question: 'Làm thế nào để tham gia chương trình giới thiệu?',
      answer: 'Để tham gia chương trình giới thiệu, bạn cần có tài khoản đã xác thực. Sau khi đăng nhập, vào mục "Giới thiệu" và lấy mã giới thiệu cá nhân hoặc link giới thiệu để chia sẻ với bạn bè.'
    },
    {
      question: 'Tôi sẽ nhận được những phần thưởng gì khi giới thiệu bạn bè?',
      answer: 'Khi giới thiệu thành công, bạn sẽ nhận được 500 Gems cho mỗi người. Bạn cũng sẽ nhận được skin độc quyền khi giới thiệu 5 người, nhân vật hiếm khi giới thiệu 10 người và 10% hoa hồng từ các giao dịch mua game của người bạn giới thiệu.'
    },
    {
      question: 'Bạn bè của tôi sẽ nhận được gì khi đăng ký qua link giới thiệu?',
      answer: 'Người được giới thiệu sẽ nhận được 300 Gems khi đăng ký và đạt cấp độ 10, Gói Starter Pack bao gồm vật phẩm và trang bị cơ bản, huy hiệu đặc biệt và 10% giảm giá cho lần nạp đầu tiên trong game.'
    },
    {
      question: 'Làm thế nào để theo dõi người tôi đã giới thiệu?',
      answer: 'Bạn có thể theo dõi danh sách người đã giới thiệu trong mục "Giới thiệu của tôi". Tại đây sẽ hiển thị thông tin về người bạn đã giới thiệu, cấp độ hiện tại của họ, trạng thái và phần thưởng bạn nhận được.'
    },
    {
      question: 'Tôi cần đáp ứng điều kiện gì để nhận phần thưởng giới thiệu?',
      answer: 'Để nhận phần thưởng, người được giới thiệu phải là người chơi mới chưa có tài khoản trước đó, đạt cấp độ 10 trong game và thực hiện ít nhất một lần nạp tiền. Phần thưởng sẽ được cộng vào tài khoản của bạn trong vòng 24 giờ sau khi đáp ứng đủ điều kiện.'
    },
    {
      question: 'Mã giới thiệu có thời hạn sử dụng không?',
      answer: 'Mã giới thiệu của bạn không có thời hạn sử dụng và có thể được sử dụng nhiều lần không giới hạn. Tuy nhiên, mỗi người chơi mới chỉ có thể sử dụng một mã giới thiệu duy nhất khi đăng ký tài khoản.'
    },
    {
      question: 'Tôi có thể giới thiệu bao nhiêu người bạn?',
      answer: 'Không có giới hạn số lượng người bạn có thể giới thiệu. Càng nhiều người bạn giới thiệu, phần thưởng của bạn càng nhiều và cấp bậc của bạn trong chương trình sẽ càng cao.'
    },
    {
      question: 'Làm thế nào để đạt cấp bậc Kim Cương trong chương trình giới thiệu?',
      answer: 'Để đạt cấp Kim Cương, bạn cần giới thiệu thành công ít nhất 31 người chơi mới. Ở cấp bậc này, bạn sẽ nhận được 1500 Gems cho mỗi người, đặc quyền Cống Hiến và 20% hoa hồng từ các giao dịch mua game của người bạn giới thiệu.'
    },
    {
      question: 'Tôi có bị mất phần thưởng nếu người được giới thiệu không còn hoạt động?',
      answer: 'Không, phần thưởng bạn đã nhận sẽ không bị thu hồi nếu người được giới thiệu không còn hoạt động sau đó. Tuy nhiên, đối với hoa hồng từ giao dịch, bạn chỉ nhận được khi người được giới thiệu thực hiện giao dịch mua game.'
    },
    {
      question: 'Tôi có thể chuyển phần thưởng giới thiệu cho người khác không?',
      answer: 'Hiện tại, phần thưởng giới thiệu không thể chuyển cho người khác. Phần thưởng sẽ được cộng trực tiếp vào tài khoản của người giới thiệu và người được giới thiệu theo điều kiện của chương trình.'
    }
  ];
  
  // Xử lý khi click vào câu hỏi
  const toggleQuestion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); // Đóng nếu đang mở
    } else {
      setOpenIndex(index); // Mở nếu đang đóng
    }
  };
  
  return (
    <div className="text-white animate-fadeIn">
      <h3 className="text-2xl font-bold mb-6 text-center">Câu Hỏi Thường Gặp</h3>
      
      <div className="bg-white/5 p-6 rounded-lg border border-white/10 mb-6">
        <p className="text-center text-gray-300 mb-6">
          Dưới đây là những câu hỏi thường gặp về chương trình giới thiệu. Nếu bạn không tìm thấy câu trả lời cho thắc mắc của mình, vui lòng liên hệ với chúng tôi qua mục Trợ giúp.
        </p>
      </div>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`bg-white/5 rounded-lg border ${
              openIndex === index ? 'border-purple-500/30' : 'border-white/10'
            } overflow-hidden transition-all duration-300`}
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between focus:outline-none"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex items-center">
                <FaQuestion className="text-purple-400 mr-3 flex-shrink-0" />
                <span className="font-semibold text-left">{item.question}</span>
              </div>
              <FaAngleDown 
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                } text-purple-400`} 
              />
            </button>
            
            <div 
              className={`px-6 pb-4 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-2 text-gray-300">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 bg-purple-900/20 rounded-lg border border-purple-500/30 p-6 text-center">
        <h4 className="text-lg font-semibold mb-3">Bạn vẫn còn thắc mắc?</h4>
        <p className="text-gray-300 mb-4">
          Nếu bạn không tìm thấy câu trả lời cho thắc mắc của mình, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.
        </p>
        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded transition-colors duration-300">
          Liên hệ hỗ trợ
        </button>
      </div>
    </div>
  );
} 