import { 
  Difficulty, 
  GAME_CONFIG, 
  MAX_TILES, 
  TILE_IMAGES,
  ANIMATION_DURATION
} from './constants';
import { 
  Tile, 
  Position, 
  ConnectionPath,
  ConnectionPoint
} from './types';

// Tạo mảng ô chơi dựa trên độ khó và cấp độ
export const generateTiles = (difficulty: Difficulty, levelConfig: any = null): Tile[] => {
  // Sử dụng cấu hình cấp độ nếu được cung cấp, nếu không sử dụng cấu hình độ khó mặc định
  const config = levelConfig || GAME_CONFIG[difficulty];
  const { rows, cols } = config;
  const maxPairs = (rows * cols) / 2;
  
  // Lấy random các ảnh từ TILE_IMAGES
  const shuffledImageIndices = shuffleArray([...Array(TILE_IMAGES.length).keys()]);
  const selectedImageIndices = shuffledImageIndices.slice(0, maxPairs);
  
  // Tạo mảng các cặp ô
  let tiles: Tile[] = [];
  let id = 0;
  
  // Tạo các cặp ô với cùng hình ảnh
  selectedImageIndices.forEach(imageIndex => {
    for (let i = 0; i < 2; i++) {
      tiles.push({
        id: id++,
        imageIndex,
        url: TILE_IMAGES[imageIndex],
        isMatched: false,
        isSelected: false,
        position: { row: 0, col: 0 },
      });
    }
  });
  
  // Xáo trộn mảng ô
  tiles = shuffleArray(tiles);
  
  // Gán vị trí cho từng ô
  let tileIndex = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (tileIndex < tiles.length) {
        tiles[tileIndex].position = { row, col };
        tileIndex++;
      }
    }
  }
  
  return tiles;
};

// Xáo trộn mảng
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Kiểm tra hai ô có khớp nhau không
export const checkTilesMatch = (tile1: Tile, tile2: Tile): boolean => {
  return tile1.imageIndex === tile2.imageIndex && tile1.id !== tile2.id;
};

// Kiểm tra đường đi giữa hai ô
export const findPath = (
  startTile: Tile,
  endTile: Tile,
  tiles: Tile[]
): ConnectionPath | null => {
  const { row: startRow, col: startCol } = startTile.position;
  const { row: endRow, col: endCol } = endTile.position;
  
  // Trường hợp đặc biệt: nếu ô kề nhau hoặc cùng hàng/cột, tạo đường thẳng
  
  // Kiểm tra đường thẳng ngang
  if (startRow === endRow) {
    const path = checkStraightLine(
      startTile,
      endTile,
      tiles,
      true
    );
    if (path) return path;
  }
  
  // Kiểm tra đường thẳng dọc
  if (startCol === endCol) {
    const path = checkStraightLine(
      startTile,
      endTile,
      tiles,
      false
    );
    if (path) return path;
  }
  
  // Kiểm tra đường gấp khúc một lần (chữ L)
  const lPath = checkLShape(startTile, endTile, tiles);
  if (lPath) return lPath;
  
  // Kiểm tra đường gấp khúc hai lần (chữ Z)
  const zPath = checkZShape(startTile, endTile, tiles);
  if (zPath) return zPath;
  
  // Không tìm thấy đường đi hợp lệ
  return null;
};

// Kiểm tra đường đi thẳng
const checkStraightLine = (
  startTile: Tile,
  endTile: Tile,
  tiles: Tile[],
  isHorizontal: boolean
): ConnectionPath | null => {
  const { row: startRow, col: startCol } = startTile.position;
  const { row: endRow, col: endCol } = endTile.position;
  
  // Kiểm tra cùng hàng hoặc cùng cột
  if (isHorizontal && startRow !== endRow) return null;
  if (!isHorizontal && startCol !== endCol) return null;
  
  const start = isHorizontal ? Math.min(startCol, endCol) : Math.min(startRow, endRow);
  const end = isHorizontal ? Math.max(startCol, endCol) : Math.max(startRow, endRow);
  
  // Kiểm tra không có ô nào ở giữa hai ô
  for (let i = start + 1; i < end; i++) {
    const checkPosition: Position = isHorizontal 
      ? { row: startRow, col: i }
      : { row: i, col: startCol };
    
    // Nếu có ô ở giữa và không phải là ô đã khớp
    const tileAt = findTileAtPosition(tiles, checkPosition);
    if (tileAt && !tileAt.isMatched) {
      return null;
    }
  }
  
  // Tạo đường đi
  const path: Position[] = [startTile.position];
  
  // Thêm điểm cuối
  path.push(endTile.position);
  
  return {
    startTile,
    endTile,
    path
  };
};

// Kiểm tra đường đi hình chữ L
const checkLShape = (
  startTile: Tile,
  endTile: Tile,
  tiles: Tile[]
): ConnectionPath | null => {
  const { row: startRow, col: startCol } = startTile.position;
  const { row: endRow, col: endCol } = endTile.position;
  
  // Kiểm tra điểm uốn
  const cornerPosition1: Position = { row: startRow, col: endCol };
  const cornerPosition2: Position = { row: endRow, col: startCol };
  
  // Kiểm tra điểm uốn 1 (đi ngang rồi đi dọc)
  const tileAtCorner1 = findTileAtPosition(tiles, cornerPosition1);
  if (!tileAtCorner1 || tileAtCorner1.isMatched) {
    // Kiểm tra đường đi từ start đến corner1
    const horizontalPath = checkStraightLine(
      startTile,
      { ...startTile, position: cornerPosition1 } as Tile,
      tiles,
      true
    );
    
    // Kiểm tra đường đi từ corner1 đến end
    const verticalPath = checkStraightLine(
      { ...endTile, position: cornerPosition1 } as Tile,
      endTile,
      tiles,
      false
    );
    
    if (horizontalPath && verticalPath) {
      return {
        startTile,
        endTile,
        path: [startTile.position, cornerPosition1, endTile.position]
      };
    }
  }
  
  // Kiểm tra điểm uốn 2 (đi dọc rồi đi ngang)
  const tileAtCorner2 = findTileAtPosition(tiles, cornerPosition2);
  if (!tileAtCorner2 || tileAtCorner2.isMatched) {
    // Kiểm tra đường đi từ start đến corner2
    const verticalPath = checkStraightLine(
      startTile,
      { ...startTile, position: cornerPosition2 } as Tile,
      tiles,
      false
    );
    
    // Kiểm tra đường đi từ corner2 đến end
    const horizontalPath = checkStraightLine(
      { ...endTile, position: cornerPosition2 } as Tile,
      endTile,
      tiles,
      true
    );
    
    if (verticalPath && horizontalPath) {
      return {
        startTile,
        endTile,
        path: [startTile.position, cornerPosition2, endTile.position]
      };
    }
  }
  
  return null;
};

// Kiểm tra đường đi hình chữ Z
const checkZShape = (
  startTile: Tile,
  endTile: Tile,
  tiles: Tile[]
): ConnectionPath | null => {
  const { row: startRow, col: startCol } = startTile.position;
  const { row: endRow, col: endCol } = endTile.position;
  
  // Lặp qua tất cả vị trí có thể có điểm uốn
  // Kiểm tra hướng ngang-dọc-ngang
  for (let middleRow = 0; middleRow < GAME_CONFIG[Difficulty.EXPERT].rows; middleRow++) {
    // Điểm uốn 1 và 2
    const corner1: Position = { row: middleRow, col: startCol };
    const corner2: Position = { row: middleRow, col: endCol };
    
    // Bỏ qua nếu điểm uốn trùng với vị trí bắt đầu hoặc kết thúc
    if ((corner1.row === startRow && corner1.col === startCol) || 
        (corner2.row === endRow && corner2.col === endCol)) {
      continue;
    }
    
    // Kiểm tra các đoạn đường
    const pathToCorner1 = checkStraightLine(
      startTile,
      { ...startTile, position: corner1 } as Tile,
      tiles,
      false
    );
    
    const pathBetweenCorners = checkStraightLine(
      { ...startTile, position: corner1 } as Tile,
      { ...endTile, position: corner2 } as Tile,
      tiles,
      true
    );
    
    const pathFromCorner2 = checkStraightLine(
      { ...endTile, position: corner2 } as Tile,
      endTile,
      tiles,
      false
    );
    
    if (pathToCorner1 && pathBetweenCorners && pathFromCorner2) {
      return {
        startTile,
        endTile,
        path: [startTile.position, corner1, corner2, endTile.position]
      };
    }
  }
  
  // Kiểm tra hướng dọc-ngang-dọc
  for (let middleCol = 0; middleCol < GAME_CONFIG[Difficulty.EXPERT].cols; middleCol++) {
    // Điểm uốn 1 và 2
    const corner1: Position = { row: startRow, col: middleCol };
    const corner2: Position = { row: endRow, col: middleCol };
    
    // Bỏ qua nếu điểm uốn trùng với vị trí bắt đầu hoặc kết thúc
    if ((corner1.row === startRow && corner1.col === startCol) || 
        (corner2.row === endRow && corner2.col === endCol)) {
      continue;
    }
    
    // Kiểm tra các đoạn đường
    const pathToCorner1 = checkStraightLine(
      startTile,
      { ...startTile, position: corner1 } as Tile,
      tiles,
      true
    );
    
    const pathBetweenCorners = checkStraightLine(
      { ...startTile, position: corner1 } as Tile,
      { ...endTile, position: corner2 } as Tile,
      tiles,
      false
    );
    
    const pathFromCorner2 = checkStraightLine(
      { ...endTile, position: corner2 } as Tile,
      endTile,
      tiles,
      true
    );
    
    if (pathToCorner1 && pathBetweenCorners && pathFromCorner2) {
      return {
        startTile,
        endTile,
        path: [startTile.position, corner1, corner2, endTile.position]
      };
    }
  }
  
  return null;
};

// Tìm ô ở vị trí cụ thể
export const findTileAtPosition = (
  tiles: Tile[],
  position: Position
): Tile | undefined => {
  return tiles.find(
    tile => 
      tile.position.row === position.row && 
      tile.position.col === position.col
  );
};

// Kiểm tra tất cả ô đã khớp
export const allTilesMatched = (tiles: Tile[]): boolean => {
  return tiles.every(tile => tile.isMatched);
};

// Chuyển đổi từ vị trí lưới sang tọa độ hiển thị
export const positionToCoordinates = (
  position: Position,
  tileWidth: number,
  tileHeight: number,
  gap: number
): ConnectionPoint => {
  return {
    x: position.col * (tileWidth + gap) + tileWidth / 2,
    y: position.row * (tileHeight + gap) + tileHeight / 2
  };
};

// Tạo đường kết nối từ đường đi
export const createConnection = (
  path: Position[],
  tileWidth: number,
  tileHeight: number,
  gap: number
) => {
  const points = path.map(pos => 
    positionToCoordinates(pos, tileWidth, tileHeight, gap)
  );
  
  return {
    points,
    duration: ANIMATION_DURATION.MATCH
  };
}; 