import { CardType } from '../components/Card';

// Create array of randomly shuffled cards
export const createShuffledCards = (rows: number, cols: number): CardType[] => {
  // Ensure the number of cells is even
  if ((rows * cols) % 2 !== 0) {
    throw new Error('The number of cells must be even');
  }

  const totalCards = rows * cols;
  const pairsCount = totalCards / 2;
  const cards: CardType[] = [];

  // Create array of values for card pairs (0-11 repeating if needed)
  const cardValues = Array.from({ length: pairsCount }, (_, i) => i % 12);

  // Create pairs of cards
  for (let i = 0; i < pairsCount; i++) {
    const value = cardValues[i];
    // Create two cards with the same value
    for (let j = 0; j < 2; j++) {
      cards.push({
        id: `${i}-${j}`,
        value: value,
        row: 0, // Will be updated later
        col: 0, // Will be updated later
        isMatched: false,
        isRevealed: false,
      });
    }
  }

  // Shuffle the array randomly
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

  // Assign row and column positions for each card
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

// Check if card is valid
export const isValidCard = (card: CardType | null): card is CardType => {
  return card !== null && !card.isMatched;
};

// Check if two cards match each other
export const isMatch = (card1: CardType, card2: CardType): boolean => {
  return card1.value === card2.value;
};

// Calculate score based on remaining time and number of matched pairs
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