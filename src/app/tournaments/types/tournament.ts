export interface Tournament {
  id: string;
  title: string;
  description: string;
  type: 'GVQ' | 'ChienDichBangHoi' | 'AnhHungDon' | 'Other';
  startDate: string;
  endDate: string;
  prizePool: string;
  registrationDeadline: string;
  maxTeams: number;
  currentTeams: number;
  imageUrl: string;
  categories: string[];
  venue: {
    name: string;
    type: 'HocVien' | 'XCorp' | 'SaoHoa' | 'Other';
    imageUrl: string;
  };
  specialRules?: string[];
  rewards?: {
    title: string;
    prize: string;
    description: string;
  }[];
  status: 'upcoming' | 'ongoing' | 'completed';
} 