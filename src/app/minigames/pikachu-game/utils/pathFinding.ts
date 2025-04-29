import { Card } from '../hooks/useGameLogic';
import { CardType } from '../components/Card';

interface Position {
  row: number;
  col: number;
}

interface BoardSize {
  rows: number;
  cols: number;
}

interface Node {
  row: number;
  col: number;
  parent: Node | null;
  turns: number;
}

// Định nghĩa một điểm trên bảng
interface Point {
  row: number;
  col: number;
}

// Định nghĩa một đỉnh trong đồ thị tìm đường
interface Vertex {
  point: Point;
  path: Point[];
  turns: number;
}

// Tạo bảng trạng thái từ danh sách thẻ
const createBoard = (cards: CardType[], rows: number, cols: number): (CardType | null)[][] => {
  // Khởi tạo bảng trống
  const board: (CardType | null)[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  // Đặt thẻ vào bảng
  cards.forEach(card => {
    if (card.row >= 0 && card.row < rows && card.col >= 0 && card.col < cols) {
      board[card.row][card.col] = card;
    }
  });

  return board;
};

// Kiểm tra xem vị trí có hợp lệ trên bảng không
const isValidPosition = (
  point: Point,
  rows: number,
  cols: number
): boolean => {
  return point.row >= 0 && point.row < rows && point.col >= 0 && point.col < cols;
};

// Kiểm tra xem vị trí có trống không
const isEmpty = (board: (CardType | null)[][], point: Point): boolean => {
  return board[point.row][point.col] === null;
};

// Kiểm tra xem hai vị trí có là cùng một thẻ không
const isSameCard = (start: Point, end: Point): boolean => {
  return start.row === end.row && start.col === end.col;
};

// Tìm đường đi giữa hai thẻ với tối đa 3 khúc ngoặt
export const findPath = (
  cards: CardType[],
  start: Point,
  end: Point
): Point[] | null => {
  // Nếu hai điểm trùng nhau thì không cần tìm đường
  if (isSameCard(start, end)) {
    return null;
  }

  // Tìm số hàng và số cột của bảng
  const rows = Math.max(...cards.map(card => card.row)) + 1;
  const cols = Math.max(...cards.map(card => card.col)) + 1;

  // Tạo bảng từ danh sách thẻ
  const board = createBoard(cards, rows, cols);
  
  // Xóa đi hai thẻ đang xét để có thể đi qua
  const startCard = board[start.row][start.col];
  const endCard = board[end.row][end.col];
  board[start.row][start.col] = null;
  board[end.row][end.col] = null;

  // Hàng đợi các đỉnh cần xét
  const queue: Vertex[] = [];
  // Đánh dấu các điểm đã xét với số lần rẽ
  const visited: boolean[][][] = Array(rows)
    .fill(null)
    .map(() => 
      Array(cols)
        .fill(null)
        .map(() => Array(4).fill(false))
    );

  // Thêm điểm bắt đầu vào hàng đợi
  queue.push({
    point: start,
    path: [start],
    turns: 0
  });

  // Các hướng di chuyển: lên, phải, xuống, trái
  const directions = [
    { row: -1, col: 0 }, // Lên
    { row: 0, col: 1 },  // Phải
    { row: 1, col: 0 },  // Xuống
    { row: 0, col: -1 }  // Trái
  ];

  // Thuật toán BFS tìm đường đi
  while (queue.length > 0) {
    const current = queue.shift()!;
    const { point, path, turns } = current;

    // Nếu đã đến đích
    if (point.row === end.row && point.col === end.col) {
      // Khôi phục lại bảng
      board[start.row][start.col] = startCard;
      board[end.row][end.col] = endCard;
      return path;
    }

    // Kiểm tra 4 hướng
    for (let i = 0; i < 4; i++) {
      const dir = directions[i];
      const nextPoint = {
        row: point.row + dir.row,
        col: point.col + dir.col
      };

      // Kiểm tra vị trí hợp lệ
      if (!isValidPosition(nextPoint, rows, cols)) {
        continue;
      }

      // Kiểm tra nếu là điểm kết thúc hoặc là ô trống
      if ((nextPoint.row === end.row && nextPoint.col === end.col) || isEmpty(board, nextPoint)) {
        // Tính số lần rẽ mới
        let newTurns = turns;
        if (path.length > 1) {
          const prevDir = {
            row: point.row - path[path.length - 2].row,
            col: point.col - path[path.length - 2].col
          };
          if (prevDir.row !== dir.row || prevDir.col !== dir.col) {
            newTurns++;
          }
        }

        // Nếu số lần rẽ lớn hơn 3, bỏ qua
        if (newTurns > 3) {
          continue;
        }

        // Nếu đã thăm điểm này với số lần rẽ ít hơn, bỏ qua
        if (visited[nextPoint.row][nextPoint.col][newTurns]) {
          continue;
        }

        // Đánh dấu đã thăm
        visited[nextPoint.row][nextPoint.col][newTurns] = true;

        // Thêm vào hàng đợi
        queue.push({
          point: nextPoint,
          path: [...path, nextPoint],
          turns: newTurns
        });
      }
    }
  }

  // Khôi phục lại bảng
  board[start.row][start.col] = startCard;
  board[end.row][end.col] = endCard;
  
  // Không tìm thấy đường đi
  return null;
};

// Hàm kiểm tra nếu có đường đi giữa hai thẻ
export const checkPathExists = (
  cards: CardType[],
  start: Point,
  end: Point
): Point[] | null => {
  return findPath(cards, start, end);
};

// Tìm tất cả các cặp có thể ghép
export const findAllPossiblePairs = (board: number[][]): [Position, Position][] => {
  const rows = board.length;
  const cols = board[0].length;
  const result: [Position, Position][] = [];
  
  // Map để theo dõi các ô đã kiểm tra
  const checked = new Set<string>();
  
  // Duyệt qua tất cả các ô
  for (let r1 = 0; r1 < rows; r1++) {
    for (let c1 = 0; c1 < cols; c1++) {
      // Bỏ qua ô trống
      if (board[r1][c1] === 0) continue;
      
      // Duyệt qua các ô còn lại
      for (let r2 = 0; r2 < rows; r2++) {
        for (let c2 = 0; c2 < cols; c2++) {
          // Bỏ qua nếu đây là cùng một ô
          if (r1 === r2 && c1 === c2) continue;
          
          // Tạo ID duy nhất cho cặp (không phân biệt thứ tự)
          const id1 = `${r1},${c1},${r2},${c2}`;
          const id2 = `${r2},${c2},${r1},${c1}`;
          
          // Bỏ qua nếu đã kiểm tra cặp này
          if (checked.has(id1) || checked.has(id2)) continue;
          
          // Đánh dấu cặp này đã kiểm tra
          checked.add(id1);
          checked.add(id2);
          
          // Kiểm tra xem có thể kết nối không
          const path = findPath(board, r1, c1, r2, c2);
          if (path) {
            result.push([{ row: r1, col: c1 }, { row: r2, col: c2 }]);
          }
        }
      }
    }
  }
  
  return result;
};

export default {
  findPath,
  findAllPossiblePairs
}; 