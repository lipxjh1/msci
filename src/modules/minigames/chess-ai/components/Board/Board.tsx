import React, { useState, useRef, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { Square as SquareType, PieceType } from '../../types';
import { Square } from '../Square/Square';
import { Piece } from '../Piece/Piece';
import { PromotionModal } from '../PromotionModal/PromotionModal';
import { MoveAnimation } from '../MoveAnimation/MoveAnimation';
import styles from './Board.module.css';

export const Board: React.FC = () => {
  const { gameState, selectPiece, movePiece, playerColor } = useGameContext();
  const [promotionParams, setPromotionParams] = useState<{ from: SquareType; to: SquareType } | null>(null);
  const [moveAnimation, setMoveAnimation] = useState<{
    from: SquareType;
    to: SquareType;
    piece: any;
  } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [squareSize, setSquareSize] = useState(0);

  // Tính toán kích thước các ô cờ
  useEffect(() => {
    const updateSquareSize = () => {
      if (boardRef.current) {
        const size = boardRef.current.clientWidth / 8;
        setSquareSize(size);
      }
    };

    updateSquareSize();
    window.addEventListener('resize', updateSquareSize);
    return () => window.removeEventListener('resize', updateSquareSize);
  }, []);

  const handleSquareClick = (x: number, y: number) => {
    // Nếu đang hiển thị modal phong cấp, không cho phép click
    if (promotionParams) return;
    
    const clickedSquare = { x, y };
    const selectedPiece = gameState.selectedPiece;
    
    // Nếu chưa có quân cờ nào được chọn
    if (!selectedPiece) {
      selectPiece(clickedSquare);
      return;
    }
    
    // Nếu là ô đã được chọn, bỏ chọn
    if (selectedPiece.x === x && selectedPiece.y === y) {
      selectPiece(clickedSquare);
      return;
    }
    
    // Kiểm tra xem ô được click có phải là nước đi hợp lệ không
    const isValidMove = gameState.validMoves.some(
      move => move.x === x && move.y === y
    );
    
    if (isValidMove) {
      // Kiểm tra xem có phải là nước đi phong cấp không
      if (isPawnPromotionMove(selectedPiece, clickedSquare)) {
        setPromotionParams({ from: selectedPiece, to: clickedSquare });
        return;
      }
      
      // Lưu thông tin animation trước khi di chuyển
      const pieceToMove = gameState.board[selectedPiece.y][selectedPiece.x];
      
      // Thực hiện nước đi
      const moveSuccess = movePiece(selectedPiece, clickedSquare);
      
      if (moveSuccess && pieceToMove) {
        // Hiển thị animation sau khi di chuyển thành công
        setMoveAnimation({
          from: selectedPiece,
          to: clickedSquare,
          piece: pieceToMove
        });
      }
    } else {
      // Nếu là ô không hợp lệ, chọn ô mới (nếu có quân cờ ở đó)
      selectPiece(clickedSquare);
    }
  };
  
  // Kiểm tra nếu là nước đi phong cấp tốt
  const isPawnPromotionMove = (from: SquareType, to: SquareType): boolean => {
    const piece = gameState.board[from.y][from.x];
    if (!piece || piece.type !== 'p') return false;
    
    const isWhitePawn = piece.color === 'w';
    const isBlackPawn = piece.color === 'b';
    
    // Tốt trắng lên hàng cuối cùng hoặc tốt đen xuống hàng đầu tiên
    if ((isWhitePawn && to.y === 0) || (isBlackPawn && to.y === 7)) {
      return true;
    }
    
    return false;
  };
  
  // Xử lý việc phong cấp
  const handlePromotion = (pieceType: PieceType) => {
    if (!promotionParams) return;
    
    movePiece(promotionParams.from, promotionParams.to, pieceType);
    setPromotionParams(null);
  };
  
  // Hàm đảo ngược bàn cờ cho người chơi quân đen
  const getSquareCoordinates = (x: number, y: number) => {
    if (playerColor === 'b') {
      return { x: 7 - x, y: 7 - y };
    }
    return { x, y };
  };
  
  // Render bàn cờ
  const renderBoard = () => {
    const rows = [];
    
    for (let y = 0; y < 8; y++) {
      const cells = [];
      for (let x = 0; x < 8; x++) {
        // Tính toán tọa độ dựa trên màu người chơi
        const coordsForRender = { x, y };
        const realCoords = getSquareCoordinates(x, y);
        
        const piece = gameState.board[realCoords.y][realCoords.x];
        const selected = gameState.selectedPiece && 
                        gameState.selectedPiece.x === realCoords.x && 
                        gameState.selectedPiece.y === realCoords.y;
        
        const isValidMove = gameState.validMoves.some(
          move => move.x === realCoords.x && move.y === realCoords.y
        );
        
        cells.push(
          <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            isSelected={selected || false}
            isValidMove={isValidMove}
            onClick={() => handleSquareClick(realCoords.x, realCoords.y)}
          >
            {piece && <Piece type={piece.type} color={piece.color} />}
          </Square>
        );
      }
      rows.push(<React.Fragment key={y}>{cells}</React.Fragment>);
    }
    
    return rows;
  };
  
  // Render tọa độ trên bàn cờ
  const renderCoordinates = () => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    
    // Đảo ngược tọa độ cho người chơi quân đen
    const filesToRender = playerColor === 'b' ? [...files].reverse() : files;
    const ranksToRender = playerColor === 'b' ? [...ranks].reverse() : ranks;
    
    return (
      <>
        <div className={styles.rankCoordinates}>
          {ranksToRender.map((rank, index) => (
            <div key={rank} className={styles.coordinate}>{rank}</div>
          ))}
        </div>
        <div className={styles.fileCoordinates}>
          {filesToRender.map((file, index) => (
            <div key={file} className={styles.coordinate}>{file}</div>
          ))}
        </div>
      </>
    );
  };
  
  return (
    <div className={styles.boardContainer}>
      <div ref={boardRef} className={styles.board}>
        {renderBoard()}
      </div>
      
      {renderCoordinates()}
      
      {promotionParams && (
        <PromotionModal
          color={gameState.turn}
          onSelect={handlePromotion}
          onClose={() => setPromotionParams(null)}
        />
      )}
      
      {moveAnimation && squareSize > 0 && (
        <MoveAnimation
          piece={moveAnimation.piece}
          fromSquare={moveAnimation.from}
          toSquare={moveAnimation.to}
          squareSize={squareSize}
          onComplete={() => setMoveAnimation(null)}
        />
      )}
    </div>
  );
}; 