import { Chess } from 'chess.js';
import { PieceType } from '../../types';

/**
 * Chuyển đổi ký hiệu quân cờ sang tên đầy đủ
 */
export function pieceTypeToName(type: PieceType): string {
  const pieceNames: Record<PieceType, string> = {
    p: 'tốt',
    n: 'mã',
    b: 'tượng',
    r: 'xe',
    q: 'hậu',
    k: 'vua'
  };
  
  return pieceNames[type];
}

/**
 * Chuyển đổi quân cờ sang biểu tượng Unicode
 */
export function pieceToUnicode(piece: string): string {
  const pieceMap: Record<string, string> = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  };
  
  return pieceMap[piece] || '';
}

/**
 * Chuyển đổi nước đi SAN (Standard Algebraic Notation) sang mô tả tiếng Việt
 */
export function sanMoveToVietnamese(sanMove: string, chess: Chess): string {
  if (sanMove === 'O-O') return 'Nhập thành ngắn';
  if (sanMove === 'O-O-O') return 'Nhập thành dài';
  
  // Xử lý phong cấp
  if (sanMove.includes('=')) {
    const base = sanMove.substring(0, sanMove.length - 2);
    const promotionPiece = sanMove.charAt(sanMove.length - 1);
    return `${base} phong ${pieceTypeToName(promotionPiece.toLowerCase() as PieceType)}`;
  }
  
  // Xử lý chiếu và chiếu bí
  let suffix = '';
  if (sanMove.endsWith('+')) {
    suffix = ' (chiếu)';
    sanMove = sanMove.substring(0, sanMove.length - 1);
  } else if (sanMove.endsWith('#')) {
    suffix = ' (chiếu bí)';
    sanMove = sanMove.substring(0, sanMove.length - 1);
  }
  
  // Xử lý bắt quân
  const hasCapture = sanMove.includes('x');
  
  // Xử lý loại quân
  let pieceType: PieceType = 'p';
  if (/[KQRBN]/.test(sanMove[0])) {
    pieceType = sanMove[0].toLowerCase() as PieceType;
    sanMove = sanMove.substring(1);
  }
  
  // Lắp các phần lại với nhau
  let result = pieceTypeToName(pieceType);
  
  if (hasCapture) {
    result += ' bắt';
  } else {
    result += ' đi';
  }
  
  // Thêm vị trí đích
  const destination = sanMove.slice(-2);
  result += ` ${destination}${suffix}`;
  
  return result;
}

/**
 * Chuyển đổi FEN sang mô tả trạng thái bàn cờ tiếng Việt
 */
export function fenToDescription(fen: string): string {
  const chess = new Chess(fen);
  
  let description = 'Bàn cờ hiện tại: ';
  
  if (chess.isCheckmate()) {
    description += 'Chiếu bí! ';
    description += chess.turn() === 'w' ? 'Đen thắng.' : 'Trắng thắng.';
  } else if (chess.isDraw()) {
    description += 'Hòa cờ. ';
    if (chess.isStalemate()) {
      description += 'Bế tắc.';
    } else if (chess.isThreefoldRepetition()) {
      description += 'Lặp lại 3 lần.';
    } else if (chess.isInsufficientMaterial()) {
      description += 'Không đủ quân để chiếu bí.';
    } else {
      description += 'Luật 50 nước đi.';
    }
  } else {
    if (chess.isCheck()) {
      description += 'Đang bị chiếu! ';
    }
    description += chess.turn() === 'w' ? 'Lượt trắng đi.' : 'Lượt đen đi.';
  }
  
  return description;
} 