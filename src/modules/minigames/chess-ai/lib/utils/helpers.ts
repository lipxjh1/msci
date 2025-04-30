import { Square } from '../../types';

/**
 * Chuyển đổi tọa độ hàng và cột sang ký hiệu đại số (algebraic notation) như 'e4', 'a1'
 */
export function squareToAlgebraic(square: Square): string {
  const file = String.fromCharCode(97 + square.x); // 97 is ASCII for 'a'
  const rank = 8 - square.y;
  return `${file}${rank}`;
}

/**
 * Chuyển đổi từ ký hiệu đại số sang tọa độ x, y
 */
export function algebraicToSquare(algebraic: string): Square {
  const file = algebraic.charCodeAt(0) - 97; // 97 is ASCII for 'a'
  const rank = 8 - parseInt(algebraic[1]);
  return { x: file, y: rank };
}

/**
 * Tạo một mảng 2D 8x8 với giá trị null
 */
export function createEmptyBoard(): (null)[][] {
  return Array(8).fill(null).map(() => Array(8).fill(null));
}

/**
 * Kiểm tra xem vị trí có nằm trong bàn cờ không
 */
export function isInsideBoard(x: number, y: number): boolean {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

/**
 * Đảo ngược bảng giá trị vị trí cho quân đen
 */
export function flipPositionValueTable(table: number[][]): number[][] {
  return [...table].reverse();
}

/**
 * Tạo bản sao sâu của một đối tượng
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Tạo ID duy nhất
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Tính số quân cờ trên bàn
 */
export function countPieces(fen: string): number {
  const boardPart = fen.split(' ')[0];
  return boardPart.split('').filter(c => /[pnbrqkPNBRQK]/.test(c)).length;
}

/**
 * Kiểm tra xem có phải là giai đoạn cuối của trò chơi không
 * (Thường là khi còn ít hơn 10 quân)
 */
export function isEndgame(fen: string): boolean {
  return countPieces(fen) <= 10;
} 