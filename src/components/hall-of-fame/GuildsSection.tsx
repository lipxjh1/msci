import React from 'react';
import Image from 'next/image';

const GuildsSection: React.FC = () => {
  const guilds = [
    {
      id: 1,
      name: 'Dragon Warriors',
      description: 'Bang hội hàng đầu với thành tích chiến đấu xuất sắc trong các trận đánh lớn.',
      avatarUrl: '/images/hall-of-fame/guilds/dragon-warriors.jpg',
      achievements: ['Vô địch Guild War 2023', 'Top 1 Guild PvP']
    },
    {
      id: 2,
      name: 'Phoenix Rising',
      description: 'Bang hội nổi tiếng với chiến thuật hỏa công và khả năng hồi phục nhanh chóng.',
      avatarUrl: '/images/hall-of-fame/guilds/phoenix-rising.jpg',
      achievements: ['Á quân Guild War 2023', 'Top 1 Guild Farming']
    },
    {
      id: 3,
      name: 'Shadow Alliance',
      description: 'Bang hội chuyên về thám thính và ám sát, kiểm soát thông tin trên toàn máy chủ.',
      avatarUrl: '/images/hall-of-fame/guilds/shadow-alliance.jpg',
      achievements: ['Vô địch Guild Espionage', 'Top 3 Guild PvP']
    },
  ];

  return (
    <section id="guilds" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white border-b-2 border-cyan-500 pb-2 inline-block">Bang Hội Tiêu Biểu</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
            Những bang hội đã tạo nên lịch sử và thành tựu ấn tượng trong thế giới M-SCI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guilds.map((guild) => (
            <div 
              key={guild.id}
              className="bg-gray-900 rounded-lg p-5 border-l-4 border-cyan-500 hover:shadow-lg hover:shadow-cyan-900/30 transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 w-12 h-12 relative overflow-hidden rounded-full border border-cyan-800">
                  <Image 
                    src={guild.avatarUrl} 
                    alt={guild.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{guild.name}</h3>
              </div>
              
              <p className="text-gray-400 mb-4 text-sm">{guild.description}</p>
              
              <div>
                <h4 className="text-xs text-cyan-400 uppercase tracking-wider mb-2 font-semibold">Thành tựu nổi bật</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {guild.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuildsSection; 