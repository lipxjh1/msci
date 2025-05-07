import React from 'react';
import Image from 'next/image';

const InternationalSection: React.FC = () => {
  const regions = [
    {
      id: 1,
      name: 'Châu Á - Thái Bình Dương',
      playerCount: '5.2 triệu',
      topCountry: 'Hàn Quốc',
      flagUrl: '/images/hall-of-fame/flags/korea.svg',
      achievements: 'Khu vực với số lượng giải đấu nhiều nhất và cộng đồng esports sôi động nhất.'
    },
    {
      id: 2,
      name: 'Châu Âu',
      playerCount: '4.8 triệu',
      topCountry: 'Đức',
      flagUrl: '/images/hall-of-fame/flags/germany.svg',
      achievements: 'Khu vực có tỉ lệ người chơi trung thành cao nhất và cộng đồng modder lớn mạnh.'
    },
    {
      id: 3,
      name: 'Bắc Mỹ',
      playerCount: '3.9 triệu',
      topCountry: 'Hoa Kỳ',
      flagUrl: '/images/hall-of-fame/flags/usa.svg',
      achievements: 'Khu vực dẫn đầu về sáng tạo nội dung và stream game trên các nền tảng.'
    },
    {
      id: 4,
      name: 'Nam Mỹ',
      playerCount: '2.5 triệu',
      topCountry: 'Brazil',
      flagUrl: '/images/hall-of-fame/flags/brazil.svg',
      achievements: 'Cộng đồng đam mê nhất với tỉ lệ tăng trưởng người chơi cao nhất trong năm qua.'
    },
  ];

  return (
    <section id="international" className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white border-b-2 border-indigo-500 pb-2 inline-block">Cộng Đồng Quốc Tế</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
            M-SCI là hiện tượng toàn cầu với người chơi từ mọi châu lục, 
            tạo nên cộng đồng đa dạng văn hóa và sôi động.
          </p>
        </div>

        {/* World map indicator */}
        <div className="mb-12 text-center">
          <div className="inline-block bg-gray-900 px-5 py-3 rounded-lg border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Tổng số người chơi toàn cầu</p>
            <p className="text-3xl font-bold text-indigo-400">16.4 triệu+</p>
          </div>
        </div>

        {/* Region stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((region) => (
            <div 
              key={region.id}
              className="bg-gray-900 p-4 rounded border-t-2 border-indigo-500"
            >
              <h3 className="text-lg font-bold text-white mb-3">{region.name}</h3>
              
              <div className="flex items-center mb-3">
                <div className="mr-3 w-6 h-6 relative overflow-hidden rounded-full">
                  <Image 
                    src={region.flagUrl} 
                    alt={region.topCountry}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Quốc gia nổi bật</p>
                  <p className="text-sm text-white">{region.topCountry}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-gray-500">Số lượng người chơi</p>
                <p className="text-lg text-indigo-400 font-semibold">{region.playerCount}</p>
              </div>
              
              <p className="text-gray-400 text-xs">{region.achievements}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternationalSection; 