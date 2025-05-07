import { Tournament } from '../types/tournament';

// Dữ liệu giả lập cho các giải đấu
const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    title: 'Giải Vô Địch Quân Đoàn M-SCI - Mùa Trái Đất',
    description: 'Giải đấu cao cấp nhất tái hiện cuộc chiến 100 màn trong game. Mùa Trái Đất tập trung vào 20 màn đầu tiên.',
    type: 'GVQ',
    startDate: '2049-03-15',
    endDate: '2049-04-15',
    prizePool: '100.000 $MSCI',
    registrationDeadline: '2049-03-10',
    maxTeams: 32,
    currentTeams: 28,
    imageUrl: '/images/heroes/shoot9.png',
    categories: ['Esports', 'Đội Tuyển', 'Premium'],
    venue: {
      name: 'Học Viện M-SCI',
      type: 'HocVien',
      imageUrl: '/images/heroes/ui 10.png'
    },
    specialRules: [
      'Vòng loại: Thi đấu qua màn 1-20',
      'Vòng chung kết: Màn 21-40',
      'Trận chung kết: Màn 41-60'
    ],
    rewards: [
      {
        title: 'Giải Nhất',
        prize: '50.000 $MSCI',
        description: 'Danh hiệu "Huyền Thoại" + Nhân vật độc quyền'
      },
      {
        title: 'Giải Nhì',
        prize: '30.000 $MSCI',
        description: 'Trang phục hiếm Quân Đoàn'
      },
      {
        title: 'Giải Ba',
        prize: '20.000 $MSCI',
        description: 'Vũ khí đặc biệt X-Corp'
      }
    ],
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Chiến Dịch Bang Hội M-SCI: Phản Công',
    description: 'Mô phỏng cuộc chiến Guild War trong game. Mỗi bang chọn 100 thành viên, chia thành 4 đội chiến thuật.',
    type: 'ChienDichBangHoi',
    startDate: '2049-02-20',
    endDate: '2049-03-10',
    prizePool: '50.000 $MSCI',
    registrationDeadline: '2049-02-15',
    maxTeams: 16,
    currentTeams: 16,
    imageUrl: '/images/heroes/shoot10.png',
    categories: ['Bang Hội', 'Guild War', 'Đồng Đội'],
    venue: {
      name: 'Căn Cứ X-Corp',
      type: 'XCorp',
      imageUrl: '/images/heroes/uiux 1.png'
    },
    specialRules: [
      'Mỗi bang chọn 100 thành viên chia thành 4 đội',
      'Chiến đấu trong môi trường Nhà tù ngầm',
      'Giới hạn 4 tiếng cho mỗi trận đấu'
    ],
    status: 'ongoing'
  },
  {
    id: '3',
    title: 'Giải Anh Hùng Đơn - Hy Sinh Vĩ Đại',
    description: 'Tôn vinh những cá nhân xuất sắc. Vòng chung kết phải vượt qua thử thách "Hy Sinh" giống Độ Phùng.',
    type: 'AnhHungDon',
    startDate: '2049-04-05',
    endDate: '2049-04-20',
    prizePool: '20.000 $MSCI',
    registrationDeadline: '2049-04-01',
    maxTeams: 128,
    currentTeams: 86,
    imageUrl: '/images/heroes/shoot11.png',
    categories: ['Đơn', 'Thách Đấu', 'Nhân Vật'],
    venue: {
      name: 'Sao Hỏa Đỏ',
      type: 'SaoHoa',
      imageUrl: '/images/heroes/uiux3.png'
    },
    specialRules: [
      'Hình thức 1 đấu 1 qua 100 màn',
      'Vòng chung kết phải vượt qua thử thách "Hy Sinh"',
      'Người chơi phải đưa ra lựa chọn khó khăn về đạo đức'
    ],
    rewards: [
      {
        title: 'Top 1',
        prize: '20.000 $MSCI',
        description: 'Danh hiệu "Người Phản Bội Vĩ Đại" + Nhân vật S độc quyền'
      }
    ],
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Giải "Cuộc Chiến Sao Hỏa"',
    description: 'Tái hiện Chương 26-35 của cốt truyện trong môi trường Sao Hỏa Đỏ.',
    type: 'Other',
    startDate: '2049-05-10',
    endDate: '2049-06-10',
    prizePool: '75.000 $MSCI',
    registrationDeadline: '2049-05-01',
    maxTeams: 64,
    currentTeams: 48,
    imageUrl: '/images/heroes/shoot_sau 2.png',
    categories: ['Cốt Truyện', 'Đặc Biệt', 'Cao Trào'],
    venue: {
      name: 'Trung tâm Lõi Plasma',
      type: 'SaoHoa',
      imageUrl: '/images/heroes/ui11.png'
    },
    status: 'upcoming'
  },
  {
    id: '5',
    title: 'Giải "Trận Chiến Cuối Cùng"',
    description: 'Tái hiện Chương 36-37, trận chiến cuối cùng với The Ascended.',
    type: 'Other',
    startDate: '2049-07-15',
    endDate: '2049-08-15',
    prizePool: '150.000 $MSCI',
    registrationDeadline: '2049-07-01',
    maxTeams: 32,
    currentTeams: 20,
    imageUrl: '/images/heroes/shoot6.png',
    categories: ['Đỉnh Điểm', 'Premium', 'The Ascended'],
    venue: {
      name: 'Khu vực "Tân Nhân Loại"',
      type: 'SaoHoa',
      imageUrl: '/images/heroes/player_game_ui 9.png'
    },
    status: 'upcoming'
  },
  {
    id: '6',
    title: 'Chung kết Thế giới M-SCI',
    description: 'Giải đấu quy tụ những tay chơi xuất sắc nhất từ mọi giải đấu trong năm.',
    type: 'GVQ',
    startDate: '2049-12-01',
    endDate: '2049-12-15',
    prizePool: '500.000 $MSCI',
    registrationDeadline: '2049-11-15',
    maxTeams: 16,
    currentTeams: 0,
    imageUrl: '/images/heroes/shoot 2.png',
    categories: ['Tương Lai', 'Premium', 'Thế Giới'],
    venue: {
      name: 'Học Viện M-SCI',
      type: 'HocVien',
      imageUrl: '/images/heroes/drone 1.png'
    },
    status: 'upcoming'
  }
];

// Hàm giả lập API để fetch dữ liệu tournament
export const fetchTournaments = async (): Promise<Tournament[]> => {
  // Giả lập độ trễ của network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_TOURNAMENTS);
    }, 1000);
  });
};

// Hàm giả lập API để fetch một tournament cụ thể theo ID
export const fetchTournamentById = async (id: string): Promise<Tournament | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tournament = MOCK_TOURNAMENTS.find((t) => t.id === id) || null;
      resolve(tournament);
    }, 800);
  });
}; 