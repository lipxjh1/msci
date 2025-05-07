// Types for Hall of Fame data

export type Founder = {
  id: string;
  name: string;
  title: string;
  quote: string;
  description: string;
  imageUrl: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
};

export type Investor = {
  id: string;
  name: string;
  title: string;
  investment: string;
  contribution: string;
  title2?: string;
  imageUrl: string;
  tier: 'eternal' | 'diamond' | 'gold' | 'silver';
};

export type Player = {
  id: string;
  nickname: string;
  achievement: string;
  guild?: string;
  stats: {
    [key: string]: string | number;
  };
  imageUrl: string;
  tier: 'legend' | 'champion' | 'elite';
  season?: string;
};

export type Community = {
  id: string;
  name: string;
  platform: string;
  stats: {
    [key: string]: string | number;
  };
  imageUrl: string;
  type: 'creator' | 'leader' | 'helper';
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  achievedBy: string;
  date: string;
  type: 'world-first' | 'unique' | 'special';
};

export type Guild = {
  id: string;
  name: string;
  members: number;
  stats: {
    [key: string]: string | number;
  };
  imageUrl: string;
  banner?: string;
  leaders?: string[];
};

export type RegionalChampion = {
  id: string;
  nickname: string;
  region: string;
  achievement: string;
  imageUrl: string;
};

export type HallOfFameData = {
  founders: Founder[];
  investors: {
    eternal: Investor[];
    diamond: Investor[];
    others: Investor[];
  };
  players: {
    legends: Player[];
    champions: {
      [season: string]: Player[];
    };
  };
  community: {
    creators: Community[];
    leaders: Community[];
    helpers: Community[];
  };
  achievements: {
    worldFirst: Achievement[];
    unique: Achievement[];
    special: Achievement[];
  };
  guilds: Guild[];
  regional: RegionalChampion[];
}; 