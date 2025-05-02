export interface Card {
  id: number;
  name: string;
  class: 'Gunner' | 'Sniper' | 'Rocket';
  imageUrl: string;
  classColor: string;
  rarity?: 'S' | 'A' | 'B' | 'C';
  description?: string;
  skills?: string[];
  stats: {
    attack: number;
    defense: number;
    health: number;
    speed: number;
  };
}

export const CardsData: Card[] = [
  {
    id: 1,
    name: "Akane",
    class: "Gunner",
    imageUrl: "/images/ga-cha/anh1.png",
    classColor: "#FF5252",
    rarity: "S",
    description: "Shooting Star - Eliminates all robots within 3 seconds!",
    skills: ["Heavy firepower", "Area damage"],
    stats: {
      attack: 90,
      defense: 60,
      health: 75,
      speed: 85
    }
  },
  {
    id: 2,
    name: "Alice",
    class: "Sniper",
    imageUrl: "/images/ga-cha/anh2.png",
    classColor: "#2196F3",
    rarity: "S",
    description: "Hide on Bush - Becomes invisible and immortal for 5 seconds",
    skills: ["Stealth", "Critical damage"],
    stats: {
      attack: 95,
      defense: 45,
      health: 65,
      speed: 80
    }
  },
  {
    id: 3,
    name: "Caitlyn",
    class: "Rocket",
    imageUrl: "/images/ga-cha/anh3.png",
    classColor: "#FF9800",
    rarity: "S",
    description: "Big Bang - Sweeps the entire gameplay area",
    skills: ["Wide area explosion", "Stun enemies"],
    stats: {
      attack: 85,
      defense: 70,
      health: 80,
      speed: 60
    }
  },
  {
    id: 4,
    name: "Victoria",
    class: "Gunner",
    imageUrl: "/images/ga-cha/anh5.png",
    classColor: "#FF5252",
    rarity: "A",
    description: "Storm Trooper - Fires at unprecedented speed",
    skills: ["High bullet velocity", "Armor-piercing rounds"],
    stats: {
      attack: 80,
      defense: 55,
      health: 70,
      speed: 75
    }
  },
  {
    id: 5,
    name: "Alexandra",
    class: "Sniper",
    imageUrl: "/images/ga-cha/anh6.png",
    classColor: "#2196F3",
    rarity: "A",
    description: "Eagle Eye - Nothing escapes her sight",
    skills: ["Long range", "Perfect accuracy"],
    stats: {
      attack: 85,
      defense: 40,
      health: 60,
      speed: 70
    }
  }
]; 