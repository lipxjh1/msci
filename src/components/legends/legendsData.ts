import { hallOfFameData } from '@/data/hallOfFameData';
import { LegendData } from './LegendCard';

// Hàm tạo điểm ngẫu nhiên cho mục đích demo
const generatePoints = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Chuẩn bị dữ liệu huyền thoại với điểm số và xếp hạng
export const getAllLegends = (): LegendData[] => {
  // Tạo danh sách huyền thoại từ hallOfFameData
  const legends: LegendData[] = [];

  // Thêm data từ founders
  if (hallOfFameData.founders) {
    const founderLegends = hallOfFameData.founders.map(founder => ({
      id: founder.id,
      name: founder.name,
      title: founder.title,
      description: founder.description || founder.quote,
      imageUrl: founder.imageUrl,
      achievements: 'Nhà sáng lập',
      points: generatePoints(7500, 10000),
    }));
    legends.push(...founderLegends);
  }

  // Thêm data từ players.legends
  if (hallOfFameData.players && hallOfFameData.players.legends) {
    const playerLegends = hallOfFameData.players.legends.map(player => ({
      id: player.id,
      name: player.nickname,
      title: player.achievement,
      description: `${player.guild} - ${player.tier}`,
      imageUrl: player.imageUrl,
      achievements: player.stats.level ? `Cấp độ ${player.stats.level}` : 'Huyền thoại game',
      stats: player.stats,
      points: generatePoints(7000, 9500),
    }));
    legends.push(...playerLegends);
  }
  
  // Thêm data từ players.champions
  if (hallOfFameData.players && hallOfFameData.players.champions) {
    Object.entries(hallOfFameData.players.champions).forEach(([season, champions]) => {
      const championLegends = champions.map(champion => ({
        id: champion.id,
        name: champion.nickname,
        title: champion.achievement,
        description: `${champion.guild} - ${season}`,
        imageUrl: champion.imageUrl,
        achievements: 'Vô địch mùa giải',
        stats: champion.stats,
        points: generatePoints(6500, 8500),
      }));
      legends.push(...championLegends);
    });
  }

  // Thêm data từ top community leaders
  if (hallOfFameData.community && hallOfFameData.community.leaders) {
    const leaderLegends = hallOfFameData.community.leaders
      .filter(leader => {
        const title = leader.stats.title;
        return typeof title === 'string' && title.includes('Guardian');
      })
      .map(leader => ({
        id: leader.id,
        name: leader.name,
        title: typeof leader.stats.title === 'string' ? leader.stats.title : leader.platform,
        description: `Lãnh đạo cộng đồng - ${leader.platform}`,
        imageUrl: leader.imageUrl,
        achievements: leader.stats.eventsOrganized ? `${leader.stats.eventsOrganized} sự kiện` : 'Lãnh đạo cộng đồng',
        points: generatePoints(6000, 8000),
      }));
    legends.push(...leaderLegends);
  }

  // Thêm data từ top investors (eternal)
  if (hallOfFameData.investors && hallOfFameData.investors.eternal) {
    const investorLegends = hallOfFameData.investors.eternal.map(investor => ({
      id: investor.id,
      name: investor.name,
      title: investor.title,
      description: `Đầu tư: ${investor.investment}`,
      imageUrl: investor.imageUrl,
      achievements: investor.contribution,
      points: generatePoints(6800, 9000),
    }));
    legends.push(...investorLegends);
  }

  // Thêm một số huyền thoại phụ (demo)
  const additionalLegends = [
    {
      id: 'legend-1',
      name: 'Chiến Binh Ánh Sáng',
      title: 'Người Giải Cứu M-SCI',
      description: 'Đã cứu thế giới M-SCI khỏi sự diệt vong trong "Cuộc Chiến Hắc Ám"',
      imageUrl: '/images/hall-of-fame/legends/warrior-of-light.jpg',
      achievements: 'Đánh bại BOSS Hắc Ám',
      points: generatePoints(8000, 9800),
    },
    {
      id: 'legend-2',
      name: 'Tinh Linh Cổ Đại',
      title: 'Bậc Thầy Phép Thuật',
      description: 'Tinh linh huyền bí đã sáng tạo nên hệ thống phép thuật trong M-SCI',
      imageUrl: '/images/hall-of-fame/legends/ancient-spirit.jpg',
      achievements: 'Sáng tạo 100+ phép thuật',
      points: generatePoints(7500, 9500),
    },
    {
      id: 'legend-3',
      name: 'Thợ Rèn Vĩ Đại',
      title: 'Bậc Thầy Chế Tạo',
      description: 'Người đã chế tạo những vũ khí huyền thoại mạnh nhất M-SCI',
      imageUrl: '/images/hall-of-fame/legends/master-blacksmith.jpg',
      achievements: 'Chế tạo 50+ vũ khí huyền thoại',
      points: generatePoints(7000, 9000),
    },
  ];
  legends.push(...additionalLegends);

  // Sắp xếp theo điểm và gán xếp hạng
  const sortedLegends = legends.sort((a, b) => (b.points || 0) - (a.points || 0));
  return sortedLegends.map((legend, index) => ({
    ...legend,
    rank: index + 1
  }));
}; 