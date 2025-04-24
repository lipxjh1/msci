export interface Card {
  id: number;
  name: string;
  class: 'Gunner' | 'Sniper' | 'Rocket';
  imageUrl: string;
  classColor: string;
  rarity?: 'S' | 'A' | 'B' | 'C';
  description?: string;
  skills?: string[];
}

export const CardsData: Card[] = [
  {
    id: 1,
    name: "Akane",
    class: "Gunner",
    imageUrl: "/images/ga-cha/anh1.png",
    classColor: "#FF5252",
    rarity: "S",
    description: "Shooting Star - Bắn toàn bộ robot trong 3 giây!",
    skills: ["Hỏa lực mạnh", "Sát thương diện rộng"]
  },
  {
    id: 2,
    name: "Alice",
    class: "Sniper",
    imageUrl: "/images/ga-cha/anh2.png",
    classColor: "#2196F3",
    rarity: "S",
    description: "Hide on Bush - Ẩn thân và bất tử 5 giây",
    skills: ["Tàng hình", "Sát thương chí mạng"]
  },
  {
    id: 3,
    name: "Caitlyn",
    class: "Rocket",
    imageUrl: "/images/ga-cha/anh3.png",
    classColor: "#FF9800",
    rarity: "S",
    description: "Big Bang - Càn quét toàn màn chơi",
    skills: ["Nổ diện rộng", "Choáng kẻ địch"]
  },
  {
    id: 4,
    name: "Victoria",
    class: "Gunner",
    imageUrl: "/images/ga-cha/anh5.png",
    classColor: "#FF5252",
    rarity: "A",
    description: "Storm Trooper - Bắn nhanh chưa từng thấy",
    skills: ["Tốc độ đạn cao", "Đạn xuyên giáp"]
  },
  {
    id: 5,
    name: "Alexandra",
    class: "Sniper",
    imageUrl: "/images/ga-cha/anh6.png",
    classColor: "#2196F3",
    rarity: "A",
    description: "Eagle Eye - Không gì thoát khỏi tầm ngắm",
    skills: ["Tầm bắn xa", "Chính xác tuyệt đối"]
  }
]; 