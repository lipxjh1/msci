'use client';

import { useState } from 'react';
import { FaFileAlt, FaChartBar, FaHeadset, FaLock, FaCode, FaImage, FaCubes } from 'react-icons/fa';
import ResourcePopup from './ResourcePopup';

export default function CreatorResources() {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const resources = [
    {
      id: 'design',
      title: 'Bộ Công Cụ Thiết Kế',
      icon: <FaImage className="w-8 h-8 text-blue-400" />,
      description: 'Tài liệu thiết kế, mẫu và hướng dẫn thương hiệu giúp bạn tạo nội dung chất lượng cao.',
      buttonColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40 hover:bg-blue-500/30',
      details: {
        title: 'Bộ Công Cụ Thiết Kế',
        description: 'Bộ công cụ thiết kế toàn diện giúp bạn tạo nội dung trực quan chất lượng cao cho M-SCI.',
        items: [
          {
            title: 'Logo và biểu tượng',
            description: 'Các file SVG và PNG chất lượng cao ở nhiều kích thước khác nhau.'
          },
          {
            title: 'Màu sắc và phông chữ',
            description: 'Hướng dẫn về bảng màu chính thức và các kiểu phông chữ.'
          },
          {
            title: 'Mẫu thumbnail',
            description: 'Mẫu sẵn cho YouTube, Twitch và các nền tảng khác.'
          },
          {
            title: 'Bộ lọc và hiệu ứng',
            description: 'Hiệu ứng màu và lớp phủ tùy chỉnh theo phong cách M-SCI.'
          },
          {
            title: 'Tài sản trò chơi',
            description: 'Render nhân vật, vũ khí và bản đồ chất lượng cao.'
          }
        ],
        downloadSize: '1.2 GB',
        format: 'ZIP (bao gồm PSD, AI, PNG, JPG)',
        updateFrequency: 'Cập nhật hàng tháng'
      }
    },
    {
      id: 'analytics',
      title: 'Công Cụ Phân Tích',
      icon: <FaChartBar className="w-8 h-8 text-purple-400" />,
      description: 'Đo lường hiệu suất nội dung, số liệu người xem và xu hướng để tối ưu hóa chiến lược của bạn.',
      buttonColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40 hover:bg-purple-500/30',
      details: {
        title: 'Công Cụ Phân Tích',
        description: 'Bộ công cụ phân tích mạnh mẽ giúp bạn theo dõi và tối ưu hóa hiệu suất nội dung của mình.',
        items: [
          {
            title: 'Bảng điều khiển tổng quan',
            description: 'Xem các chỉ số hiệu suất chính và xu hướng trong thời gian thực.'
          },
          {
            title: 'Phân tích người xem',
            description: 'Hiểu rõ về nhân khẩu học, sở thích và hành vi của người xem.'
          },
          {
            title: 'Báo cáo thu nhập',
            description: 'Theo dõi M-Coin đã kiếm được và dự báo thu nhập trong tương lai.'
          },
          {
            title: 'So sánh nội dung',
            description: 'So sánh hiệu suất giữa các nội dung khác nhau để tối ưu hóa chiến lược.'
          },
          {
            title: 'API tích hợp',
            description: 'Kết nối với YouTube Analytics, Twitch và các nền tảng khác.'
          }
        ],
        downloadSize: 'Ứng dụng web',
        format: 'Bảng điều khiển trực tuyến',
        updateFrequency: 'Cập nhật thời gian thực'
      }
    },
    {
      id: 'coding',
      title: 'Tài Nguyên Lập Trình',
      icon: <FaCode className="w-8 h-8 text-green-400" />,
      description: 'API, tài liệu và thư viện để xây dựng ứng dụng và tiện ích tùy chỉnh cho M-SCI.',
      buttonColor: 'bg-green-500/20 text-green-400 border-green-500/40 hover:bg-green-500/30',
      details: {
        title: 'Tài Nguyên Lập Trình',
        description: 'Các tài nguyên kỹ thuật dành cho nhà phát triển để tạo ứng dụng và tích hợp với hệ sinh thái M-SCI.',
        items: [
          {
            title: 'Tài liệu API',
            description: 'Tài liệu đầy đủ về các API của M-SCI, bao gồm ví dụ và hướng dẫn.'
          },
          {
            title: 'SDK cho nhiều nền tảng',
            description: 'Bộ phát triển phần mềm cho Web, Mobile và Desktop.'
          },
          {
            title: 'Webhooks',
            description: 'Tích hợp với Discord, Twitch và các dịch vụ khác.'
          },
          {
            title: 'Thư viện dữ liệu trò chơi',
            description: 'Dữ liệu về nhân vật, kỹ năng, vũ khí và các thuộc tính khác.'
          },
          {
            title: 'Mẫu ứng dụng',
            description: 'Mã nguồn mẫu cho ứng dụng theo dõi chiến thắng, bộ tạo đội hình và hơn thế nữa.'
          }
        ],
        downloadSize: '300 MB',
        format: 'GitHub Repository',
        updateFrequency: 'Cập nhật theo các phiên bản trò chơi'
      }
    },
    {
      id: 'content',
      title: 'Thư Viện Nội Dung',
      icon: <FaCubes className="w-8 h-8 text-amber-400" />,
      description: 'Kho lưu trữ các mô hình 3D, âm thanh, hiệu ứng và các tài sản trò chơi khác để sử dụng trong nội dung của bạn.',
      buttonColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30',
      details: {
        title: 'Thư Viện Nội Dung',
        description: 'Bộ sưu tập phong phú các tài sản đa phương tiện để nâng cao chất lượng nội dung của bạn.',
        items: [
          {
            title: 'Thư viện mô hình 3D',
            description: 'Mô hình nhân vật, vũ khí, bản đồ và đạo cụ ở định dạng FBX, OBJ và GLTF.'
          },
          {
            title: 'Thư viện âm thanh',
            description: 'Hiệu ứng âm thanh, nhạc nền và thoại nhân vật của trò chơi.'
          },
          {
            title: 'Hiệu ứng đặc biệt',
            description: 'Các hiệu ứng hạt, chuyển tiếp và lớp phủ cho Adobe Premiere và After Effects.'
          },
          {
            title: 'Hoạt ảnh',
            description: 'Trình tự hoạt ảnh được ghi lại trước cho các khả năng, pha hành động và cảnh.'
          },
          {
            title: 'Trang phục độc quyền',
            description: 'Nội dung độc quyền dành riêng cho người sáng tạo nội dung chương trình.'
          }
        ],
        downloadSize: '20+ GB',
        format: 'Đa định dạng (FBX, OBJ, WAV, MP3, MOV, vv)',
        updateFrequency: 'Cập nhật với mỗi sự kiện trong game'
      }
    }
  ];

  const handleOpenPopup = (resourceId: string) => {
    setSelectedResource(resourceId);
  };

  const handleClosePopup = () => {
    setSelectedResource(null);
  };

  const getSelectedResource = () => {
    return resources.find(resource => resource.id === selectedResource);
  };

  return (
    <>
      <div className="mb-16 backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl">
        <div className="flex justify-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white cyber-halo">
            <span className="text-shadow-blue relative inline-block">
              CÔNG CỤ & TÀI NGUYÊN
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-blue-bright)] to-transparent"></div>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 hover:border-[var(--accent-blue-bright)]/50 transition-all shadow-lg hover:shadow-[var(--accent-blue-bright)]/20 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                {resource.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl text-white text-center font-semibold mb-3 font-rajdhani tracking-wide">
                {resource.title}
              </h3>
              
              {/* Description */}
              <p className="text-white/70 text-center mb-6 flex-grow">
                {resource.description}
              </p>
              
              {/* Button */}
              <button
                onClick={() => handleOpenPopup(resource.id)}
                className={`w-full py-2 ${resource.buttonColor} rounded-md border transition-all duration-300 font-rajdhani tracking-wide font-medium mt-auto`}
              >
                Truy Cập Ngay
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {selectedResource && (
        <ResourcePopup 
          resource={getSelectedResource()!} 
          onClose={handleClosePopup} 
        />
      )}
    </>
  );
} 