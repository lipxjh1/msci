import { CardType } from '../components/Card';

// Tạo mảng bài đã được trộn ngẫu nhiên
export const createShuffledCards = (rows: number, cols: number): CardType[] => {
  // Đảm bảo số ô phải là số chẵn
  if ((rows * cols) % 2 !== 0) {
    throw new Error('Số lượng ô phải là số chẵn');
  }

  const totalCards = rows * cols;
  const pairsCount = totalCards / 2;
  const cards: CardType[] = [];

  // Tạo mảng giá trị cho các cặp thẻ (0-11 lặp lại nếu cần)
  const cardValues = Array.from({ length: pairsCount }, (_, i) => i % 12);

  // Tạo các cặp thẻ bài
  for (let i = 0; i < pairsCount; i++) {
    const value = cardValues[i];
    // Tạo hai thẻ với cùng giá trị
    for (let j = 0; j < 2; j++) {
      cards.push({
        id: `${i}-${j}`,
        value: value,
        row: 0, // Sẽ được cập nhật sau
        col: 0, // Sẽ được cập nhật sau
        isMatched: false,
        isRevealed: false,
      });
    }
  }

  // Trộn ngẫu nhiên mảng
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

  // Gán vị trí hàng và cột cho mỗi thẻ
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      if (index < shuffledCards.length) {
        shuffledCards[index].row = row;
        shuffledCards[index].col = col;
      }
    }
  }

  return shuffledCards;
};

// Kiểm tra xem thẻ có hợp lệ không
export const isValidCard = (card: CardType | null): card is CardType => {
  return card !== null && !card.isMatched;
};

// Kiểm tra xem hai thẻ có khớp nhau không
export const isMatch = (card1: CardType, card2: CardType): boolean => {
  return card1.value === card2.value;
};

// Tính điểm dựa trên thời gian còn lại và số lượng cặp đã ghép
export const calculateScore = (
  timeRemaining: number,
  initialTime: number,
  matchedPairs: number,
  totalPairs: number
): number => {
  const timeBonus = Math.floor((timeRemaining / initialTime) * 1000);
  const matchPoints = matchedPairs * 50;
  const completionBonus = matchedPairs === totalPairs ? 500 : 0;
  
  return timeBonus + matchPoints + completionBonus;
}; 