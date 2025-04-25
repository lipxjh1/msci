'use client';

import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

interface GuidelineSection {
  title: string;
  content: string;
  dos: string[];
  donts: string[];
  tips: string[];
}

interface GuidelineModalProps {
  section: GuidelineSection;
}

const GuidelineModal: React.FC<GuidelineModalProps> = ({ section }) => {
  return (
    <div className="text-white">
      <p className="text-white/80 mb-6">
        {section.content}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nên làm */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
          <h3 className="text-xl text-green-400 font-medium mb-4 pb-2 border-b border-white/10 flex items-center">
            <FaCheckCircle className="mr-2" /> Nên Làm
          </h3>
          <ul className="space-y-3">
            {section.dos.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Không nên làm */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
          <h3 className="text-xl text-red-400 font-medium mb-4 pb-2 border-b border-white/10 flex items-center">
            <FaTimesCircle className="mr-2" /> Không Nên Làm
          </h3>
          <ul className="space-y-3">
            {section.donts.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaTimesCircle className="text-red-400 mt-1 flex-shrink-0" />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mẹo và lời khuyên */}
      <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
        <h3 className="text-xl text-amber-400 font-medium mb-4 pb-2 border-b border-white/10 flex items-center">
          <FaLightbulb className="mr-2" /> Mẹo & Lời Khuyên
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.tips.map((tip, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 flex gap-3">
              <FaLightbulb className="text-amber-400 mt-1 flex-shrink-0" />
              <p className="text-white/80 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lưu ý quan trọng */}
      <div className="mt-6 bg-yellow-500/10 backdrop-blur-sm rounded-lg p-5 border border-yellow-500/20">
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-yellow-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg text-yellow-400 font-medium mb-2">Lưu Ý Quan Trọng</h3>
            <p className="text-white/80 text-sm">
              Việc không tuân thủ các hướng dẫn này có thể dẫn đến việc nội dung của bạn bị từ chối hoặc bị gỡ bỏ. 
              Trong trường hợp vi phạm nghiêm trọng, quyền truy cập vào chương trình Nhà sáng tạo nội dung có thể bị hạn chế 
              hoặc chấm dứt. Hãy liên hệ với quản lý nếu bạn có bất kỳ câu hỏi nào về hướng dẫn này.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidelineModal; 