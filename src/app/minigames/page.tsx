import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, image, link }) => {
  return (
    <Link href={link} className="group">
      <div className="bg-[#141528] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20 border border-[#2a2b4a]">
        <div className="relative w-full h-48 sm:h-56">
          <Image 
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default function MinigamesHome() {
  const games = [
    {
      title: 'Cờ Caro với Akane',
      description: 'Thử tài đấu trí với Akane, AI thông minh có nhiều cấp độ khó. Bạn có đánh bại được cô ấy?',
      image: '/images/minigam/3.png',
      link: '/minigames/tic-tac-toe',
    },
    {
      title: 'Flappy Bird',
      description: 'Điều khiển chú chim vượt qua các ống nước. Thử thách phản xạ và kiểm soát tay của bạn trong trò chơi huyền thoại này!',
      image: '/images/minigam/5.png',
      link: '/minigames/flappy-bird',
    },
    {
      title: 'Ghép cặp Pikachu',
      description: 'Tìm và ghép cặp các Pokémon giống nhau trong thời gian giới hạn. Thử thách trí nhớ và khả năng quan sát của bạn!',
      image: '/images/minigam/2.png',
      link: '/minigames/pikachu-game',
    },
    {
      title: 'Cờ Vua với AI',
      description: 'Thách thức trí tuệ của bạn với trò chơi cờ vua huyền thoại. Đấu với AI ở nhiều cấp độ khác nhau từ dễ đến chuyên gia.',
      image: '/images/minigam/chess.png',
      link: '/minigames/chess-ai',
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            image={game.image}
            link={game.link}
          />
        ))}
      </div>
    </div>
  );
} 