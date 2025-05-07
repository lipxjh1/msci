import { Board, Player, Difficulty, AIMove } from './types';

class TicTacToeAI {
  private difficulty: Difficulty;
  private aiPlayer: Player;
  private humanPlayer: Player;
  private WIN_LENGTH = 5;

  constructor(difficulty: Difficulty = 'medium', aiMark: Player = 'O') {
    this.difficulty = difficulty;
    this.aiPlayer = aiMark;
    this.humanPlayer = aiMark === 'X' ? 'O' : 'X';
  }

  setDifficulty(difficulty: Difficulty): void {
    this.difficulty = difficulty;
  }

  setAiMark(mark: Player): void {
    if (mark) {
      this.aiPlayer = mark;
      this.humanPlayer = mark === 'X' ? 'O' : 'X';
    }
  }

  makeMove(board: Board): AIMove {
    // Ngăn chặn ngay khi người chơi có 3+ ô liên tiếp (ưu tiên cao nhất ở mọi mức độ)
    const criticalBlockingMove = this.findThreatenedLine(board, this.humanPlayer, 3);
    if (criticalBlockingMove) {
      return criticalBlockingMove;
    }

    // Thắng ngay nếu AI có cơ hội (ưu tiên tiếp theo)
    const winningMove = this.findWinningMove(board, this.aiPlayer);
    if (winningMove) return winningMove;
    
    // Các nước đi chiến thuật khác tùy theo mức độ
    switch (this.difficulty) {
      case 'easy':
        // Mức dễ: Có 60% đi ngẫu nhiên, 40% đi thông minh nhưng chỉ với độ sâu 1
        return Math.random() > 0.6 
          ? this.makeRandomMove(board) 
          : this.makeSmartMove(board, 1);
      case 'medium':
        // Mức trung bình: Có 80% đi thông minh với độ sâu 3
        return Math.random() > 0.2
          ? this.makeSmartMove(board, 3)
          : this.makeRandomMove(board);
      case 'hard':
      default:
        // Mức khó: Luôn đi thông minh với độ sâu 5, không có ngẫu nhiên
        return this.makeSmartMove(board, 5);
    }
  }

  // Tìm và chặn khi có 3 hoặc nhiều ô liên tiếp bởi player (ưu tiên cao nhất)
  private findThreatenedLine(board: Board, player: Player, threatThreshold: number): AIMove | null {
    const size = board.length;
    
    // Các hướng để kiểm tra: ngang, dọc, chéo chính, chéo phụ
    const directions = [
      { dr: 0, dc: 1 },  // ngang
      { dr: 1, dc: 0 },  // dọc
      { dr: 1, dc: 1 },  // chéo chính
      { dr: 1, dc: -1 }, // chéo phụ
    ];
    
    // Kiểm tra tất cả các ô trên bàn cờ
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === player) {
          // Với mỗi ô đã có người chơi, kiểm tra tất cả các hướng
          for (const dir of directions) {
            let count = 1; // Ô hiện tại
            let emptyCells: AIMove[] = []; // Các ô trống trong dãy
            
            // Kiểm tra theo hướng thuận
            for (let i = 1; i < this.WIN_LENGTH; i++) {
              const r = row + dir.dr * i;
              const c = col + dir.dc * i;
              if (r >= 0 && r < size && c >= 0 && c < size) {
                if (board[r][c] === player) {
                  count++;
                } else if (board[r][c] === null) {
                  emptyCells.push({ row: r, col: c });
                } else {
                  break; // Bị chặn bởi quân đối phương
                }
              } else {
                break; // Ra ngoài biên
              }
            }
            
            // Kiểm tra theo hướng ngược
            for (let i = 1; i < this.WIN_LENGTH; i++) {
              const r = row - dir.dr * i;
              const c = col - dir.dc * i;
              if (r >= 0 && r < size && c >= 0 && c < size) {
                if (board[r][c] === player) {
                  count++;
                } else if (board[r][c] === null) {
                  emptyCells.push({ row: r, col: c });
                } else {
                  break; // Bị chặn bởi quân đối phương
                }
              } else {
                break; // Ra ngoài biên
              }
            }
            
            // Nếu có 3 hoặc nhiều quân cờ liên tiếp và có ô trống để chặn
            if (count >= threatThreshold && emptyCells.length > 0) {
              // Ưu tiên chặn ô kề với quân đang có nguy cơ tạo thành 5
              if (count >= this.WIN_LENGTH - 1) {
                return emptyCells[0]; // Chặn ngay lập tức
              }
              
              // Nếu có nhiều ô để chặn, ưu tiên ô ở giữa
              if (emptyCells.length > 1) {
                // Tính điểm cho mỗi ô trống và chọn ô có điểm cao nhất
                const scoredMoves = emptyCells.map(move => {
                  const adjacentCount = this.countAdjacentPieces(board, move.row, move.col, player);
                  return { move, score: adjacentCount };
                });
                
                // Sắp xếp theo điểm giảm dần
                scoredMoves.sort((a, b) => b.score - a.score);
                return scoredMoves[0].move;
              }
              
              return emptyCells[0];
            }
          }
        }
      }
    }
    
    return null;
  }

  // Đếm số quân cờ kề với một ô
  private countAdjacentPieces(board: Board, row: number, col: number, player: Player): number {
    let count = 0;
    const size = board.length;
    
    // Kiểm tra 8 ô xung quanh
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue; // Bỏ qua ô hiện tại
        
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          count++;
        }
      }
    }
    
    return count;
  }

  private makeRandomMove(board: Board): AIMove {
    const availableMoves: AIMove[] = [];
    const centerRegion: AIMove[] = [];
    const size = board.length;
    const center = Math.floor(size / 2);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          // Ưu tiên các ô ở vùng trung tâm của bảng (tốt cho chiến lược)
          if (Math.abs(row - center) <= 1 && Math.abs(col - center) <= 1) {
            centerRegion.push({ row, col });
          } else {
            availableMoves.push({ row, col });
          }
        }
      }
    }

    // Nếu có các ô trống ở vùng trung tâm, ưu tiên chọn chúng với xác suất cao hơn
    if (centerRegion.length > 0 && Math.random() > 0.2) {
      const randomIndex = Math.floor(Math.random() * centerRegion.length);
      return centerRegion[randomIndex];
    }

    if (availableMoves.length === 0) {
      if (centerRegion.length === 0) {
        throw new Error('No available moves');
      }
      const randomIndex = Math.floor(Math.random() * centerRegion.length);
      return centerRegion[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  private makeSmartMove(board: Board, depth: number): AIMove {
    const size = board.length;
    let bestScore = -Infinity;
    let bestMove: AIMove = { row: -1, col: -1 };
    const startTime = Date.now();
    const MAX_TIME = 1500; // Tăng thời gian tìm kiếm lên 1.5 giây

    // Chặn người chơi nếu sắp thắng (độ ưu tiên thứ 2, đã kiểm tra ở ngoài)
    const blockingMove = this.findWinningMove(board, this.humanPlayer);
    if (blockingMove) return blockingMove;

    // Tìm kiếm nước đi để tạo thế 2 chiều (có hai cơ hội tấn công)
    const twoWayAttackMove = this.findTwoWayAttackMove(board, this.aiPlayer);
    if (twoWayAttackMove && this.difficulty === 'hard') {
      return twoWayAttackMove;
    }

    // Chặn nước đi tạo thế 2 chiều của người chơi
    const blockTwoWayMove = this.findTwoWayAttackMove(board, this.humanPlayer);
    if (blockTwoWayMove && this.difficulty !== 'easy') {
      return blockTwoWayMove;
    }

    // Tìm nước đi chiến lược nếu đang ở đầu game
    const emptyCount = this.countEmptyCells(board);
    if (emptyCount > 70) {
      const strategicMove = this.findStrategicFirstMove(board);
      if (strategicMove) return strategicMove;
    }

    // Tìm nước tấn công tiềm năng (tạo cơ hội thắng trong tương lai)
    const attackMoves = this.findPotentialAttackMoves(board, this.aiPlayer);
    if (attackMoves.length > 0 && Math.random() > 0.1) {
      // Sắp xếp các nước tấn công theo điểm số và chọn nước tốt nhất
      attackMoves.sort((a, b) => b.score - a.score);
      return attackMoves[0].move;
    }

    // Tìm nước phòng thủ tiềm năng (ngăn chặn các cơ hội thắng của đối thủ)
    const defenseMoves = this.findPotentialAttackMoves(board, this.humanPlayer);
    if (defenseMoves.length > 0 && Math.random() > 0.2) {
      defenseMoves.sort((a, b) => b.score - a.score);
      return defenseMoves[0].move;
    }

    // Dùng minimax cho các trường hợp còn lại
    const availableMoves: AIMove[] = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === null) {
          availableMoves.push({ row, col });
        }
      }
    }

    // Xáo trộn mảng để giới thiệu một chút ngẫu nhiên
    this.shuffleArray(availableMoves);

    // Nếu quá nhiều nước đi có thể, giới hạn số lượng nước đi xem xét để tối ưu thời gian
    let movesToConsider = availableMoves;
    if (availableMoves.length > 30 && depth > 3) {
      // Nếu có nhiều nước đi, chỉ xem xét các nước đi ở gần các quân cờ hiện tại
      movesToConsider = this.getMovesNearPieces(board, availableMoves);
    }

    for (const move of movesToConsider) {
      const { row, col } = move;
      
      // Kiểm tra thời gian đã trôi qua, nếu quá lâu thì trả về nước đi tốt nhất đã tìm được
      if (Date.now() - startTime > MAX_TIME && bestMove.row !== -1) {
        return bestMove;
      }
      
      // Thử nước đi
      board[row][col] = this.aiPlayer;
      const score = this.minimax(board, depth, false, -Infinity, Infinity, startTime, MAX_TIME);
      // Hoàn tác nước đi
      board[row][col] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = { row, col };
      }
    }

    // Nếu không tìm thấy nước đi tốt, chọn ngẫu nhiên
    if (bestMove.row === -1 && bestMove.col === -1) {
      return this.makeRandomMove(board);
    }

    return bestMove;
  }

  // Lấy các nước đi gần với các quân cờ hiện tại
  private getMovesNearPieces(board: Board, moves: AIMove[]): AIMove[] {
    const size = board.length;
    const nearMoves: AIMove[] = [];
    const directions = [
      {dr: -1, dc: -1}, {dr: -1, dc: 0}, {dr: -1, dc: 1},
      {dr: 0, dc: -1},                   {dr: 0, dc: 1},
      {dr: 1, dc: -1},  {dr: 1, dc: 0},  {dr: 1, dc: 1}
    ];

    // Tìm tất cả các ô trống kề với các ô đã có quân
    for (const move of moves) {
      const { row, col } = move;
      for (const dir of directions) {
        const r = row + dir.dr;
        const c = col + dir.dc;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] !== null) {
          nearMoves.push(move);
          break;
        }
      }
    }

    // Nếu không có nước đi nào gần các quân cờ hiện tại, trả về tất cả các nước đi
    return nearMoves.length > 0 ? nearMoves : moves;
  }

  // Tìm nước tạo thế 2 chiều (tạo 2 cơ hội thắng cùng lúc)
  private findTwoWayAttackMove(board: Board, player: Player): AIMove | null {
    const size = board.length;
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === null) {
          // Đếm số cơ hội thắng tiềm năng từ nước đi này
          let winningOpportunities = 0;
          
          // Thử nước đi
          board[row][col] = player;
          
          // Kiểm tra các hướng
          const directions = [
            { dr: 0, dc: 1 },   // ngang
            { dr: 1, dc: 0 },   // dọc
            { dr: 1, dc: 1 },   // chéo chính
            { dr: 1, dc: -1 },  // chéo phụ
          ];
          
          for (const dir of directions) {
            let count = 1;
            let openEnds = 0;
            
            // Kiểm tra theo hướng thuận
            let blocked = false;
            for (let i = 1; i < this.WIN_LENGTH; i++) {
              const r = row + dir.dr * i;
              const c = col + dir.dc * i;
              if (r >= 0 && r < size && c >= 0 && c < size) {
                if (board[r][c] === player) {
                  count++;
                } else if (board[r][c] === null) {
                  openEnds++;
                  break;
                } else {
                  blocked = true;
                  break;
                }
              } else {
                blocked = true;
                break;
              }
            }
            
            // Kiểm tra theo hướng ngược
            let blockedReverse = false;
            for (let i = 1; i < this.WIN_LENGTH; i++) {
              const r = row - dir.dr * i;
              const c = col - dir.dc * i;
              if (r >= 0 && r < size && c >= 0 && c < size) {
                if (board[r][c] === player) {
                  count++;
                } else if (board[r][c] === null) {
                  openEnds++;
                  break;
                } else {
                  blockedReverse = true;
                  break;
                }
              } else {
                blockedReverse = true;
                break;
              }
            }
            
            // Nếu có đủ quân cờ liên tiếp và ít nhất một đầu mở, đây là cơ hội tiềm năng
            if ((count >= 3 && count < this.WIN_LENGTH) && openEnds > 0) {
              winningOpportunities++;
            }
            // Nếu có 4 quân liên tiếp (gần thắng), đây là cơ hội thắng cao
            if (count >= 4) {
              winningOpportunities += 2;
            }
          }
          
          // Hoàn tác nước đi
          board[row][col] = null;
          
          // Nếu có từ 2 cơ hội thắng trở lên, đây là nước tạo thế 2 chiều
          if (winningOpportunities >= 2) {
            return { row, col };
          }
        }
      }
    }
    
    return null;
  }

  // Tìm nước đi chiến lược cho nước đi đầu tiên
  private findStrategicFirstMove(board: Board): AIMove | null {
    const size = board.length;
    const center = Math.floor(size / 2);
    
    // Nếu ô trung tâm trống, ưu tiên đánh vào đó
    if (board[center][center] === null) {
      return { row: center, col: center };
    }
    
    // Ưu tiên các góc và các ô cạnh trung tâm
    const strategicPositions = [
      { row: 0, col: 0 },            // Góc trên bên trái
      { row: 0, col: size - 1 },     // Góc trên bên phải
      { row: size - 1, col: 0 },     // Góc dưới bên trái
      { row: size - 1, col: size - 1 }, // Góc dưới bên phải
      { row: center, col: center - 1 }, // Bên trái trung tâm
      { row: center, col: center + 1 }, // Bên phải trung tâm
      { row: center - 1, col: center }, // Phía trên trung tâm
      { row: center + 1, col: center }  // Phía dưới trung tâm
    ];
    
    for (const pos of strategicPositions) {
      if (board[pos.row][pos.col] === null) {
        return pos;
      }
    }
    
    return null;
  }

  // Tìm các nước tấn công tiềm năng (có thể dẫn đến thắng)
  private findPotentialAttackMoves(board: Board, player: Player): Array<{move: AIMove, score: number}> {
    const size = board.length;
    const potentialMoves: Array<{move: AIMove, score: number}> = [];
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === null) {
          const score = this.evaluatePosition(board, row, col, player);
          if (score > 0) {
            potentialMoves.push({ move: {row, col}, score });
          }
        }
      }
    }
    
    return potentialMoves;
  }

  // Đánh giá một vị trí dựa trên khả năng tạo đường thẳng
  private evaluatePosition(board: Board, row: number, col: number, player: Player): number {
    const size = board.length;
    let totalScore = 0;
    
    // Các hướng để kiểm tra: ngang, dọc, chéo chính, chéo phụ
    const directions = [
      { dr: 0, dc: 1 },  // ngang
      { dr: 1, dc: 0 },  // dọc
      { dr: 1, dc: 1 },  // chéo chính
      { dr: 1, dc: -1 }, // chéo phụ
    ];
    
    for (const dir of directions) {
      let ownCount = 0;
      let emptyCount = 1; // Tính cả ô hiện tại là trống
      let blocked = false;
      let patternFound = false;
      
      // Kiểm tra theo hướng thuận
      for (let i = 1; i < this.WIN_LENGTH; i++) {
        const r = row + dir.dr * i;
        const c = col + dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size) {
          if (board[r][c] === player) {
            ownCount++;
          } else if (board[r][c] === null) {
            emptyCount++;
          } else {
            blocked = true;
            break;
          }
        } else {
          blocked = true;
          break;
        }
      }
      
      // Kiểm tra theo hướng ngược
      for (let i = 1; i < this.WIN_LENGTH; i++) {
        const r = row - dir.dr * i;
        const c = col - dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size) {
          if (board[r][c] === player) {
            ownCount++;
          } else if (board[r][c] === null) {
            emptyCount++;
          } else {
            blocked = true;
            break;
          }
        } else {
          blocked = true;
          break;
        }
      }
      
      // Tính điểm cho vị trí này
      if (ownCount + emptyCount >= this.WIN_LENGTH) {
        // Kiểm tra các mẫu đặc biệt
        
        // Mẫu: X_X (hai quân cờ với một khoảng trống ở giữa)
        if (ownCount == 2 && !blocked) {
          // Kiểm tra xem hai quân cờ có ở hai bên của vị trí hiện tại không
          let hasGap = false;
          
          for (let i = 1; i < 3; i++) {
            const r1 = row + dir.dr * i;
            const c1 = col + dir.dc * i;
            const r2 = row - dir.dr;
            const c2 = col - dir.dc;
            
            if (r1 >= 0 && r1 < size && c1 >= 0 && c1 < size && 
                r2 >= 0 && r2 < size && c2 >= 0 && c2 < size) {
              if (board[r1][c1] === player && board[r2][c2] === player) {
                hasGap = true;
                break;
              }
            }
          }
          
          if (hasGap) {
            totalScore += 150; // Điểm cao cho mẫu X_X
            patternFound = true;
          }
        }
        
        if (!patternFound) {
          if (ownCount >= this.WIN_LENGTH - 1) {
            return 1000; // Sắp thắng, điểm cực cao
          } else if (ownCount >= this.WIN_LENGTH - 2) {
            totalScore += 100; // Có khả năng cao dẫn đến thắng
          } else if (ownCount >= 1) {
            totalScore += 10 * ownCount; // Có tiềm năng
          }
        }
      }
    }
    
    return totalScore;
  }

  // Thêm phương thức để đếm số ô trống
  private countEmptyCells(board: Board): number {
    let count = 0;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          count++;
        }
      }
    }
    return count;
  }

  // Xáo trộn mảng (để thêm tính ngẫu nhiên)
  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private findWinningMove(board: Board, player: Player): AIMove | null {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          // Thử nước đi
          board[row][col] = player;
          const winner = this.checkWinner(board, row, col);
          // Hoàn tác nước đi
          board[row][col] = null;
          
          if (winner === player) {
            return { row, col };
          }
        }
      }
    }
    return null;
  }

  private minimax(
    board: Board,
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number,
    startTime: number,
    maxTime: number
  ): number {
    // Kiểm tra thời gian để tránh tốn quá nhiều thời gian tính toán
    if (Date.now() - startTime > maxTime) {
      return 0; // Trả về giá trị trung tính nếu hết thời gian
    }

    // Kiểm tra game kết thúc hoặc đạt độ sâu tối đa
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] !== null) {
          const winner = this.checkWinner(board, row, col);
          if (winner === this.aiPlayer) return 100 + depth; // AI thắng, điểm cao
          if (winner === this.humanPlayer) return -100 - depth; // Người chơi thắng, điểm thấp
        }
      }
    }
    
    if (this.isBoardFull(board) || depth === 0) {
      return this.evaluateBoard(board); // Đánh giá bàn cờ ở độ sâu 0
    }

    // Tối ưu hóa: Giảm số nước đi cần xem xét ở độ sâu cao
    const availableMoves: AIMove[] = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          availableMoves.push({ row, col });
        }
      }
    }

    // Xáo trộn mảng để giới thiệu một chút ngẫu nhiên
    this.shuffleArray(availableMoves);

    // Giảm số lượng nước đi cần xem xét ở độ sâu cao
    let movesToConsider = availableMoves;
    if (depth < 3 && availableMoves.length > 20) {
      // Chỉ xem xét 20 nước đi đầu tiên ở độ sâu sâu
      movesToConsider = availableMoves.slice(0, 20);
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of movesToConsider) {
        const { row, col } = move;
        board[row][col] = this.aiPlayer;
        const score = this.minimax(board, depth - 1, false, alpha, beta, startTime, maxTime);
        board[row][col] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const move of movesToConsider) {
        const { row, col } = move;
        board[row][col] = this.humanPlayer;
        const score = this.minimax(board, depth - 1, true, alpha, beta, startTime, maxTime);
        board[row][col] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return bestScore;
    }
  }

  // Đánh giá tổng thể bàn cờ
  private evaluateBoard(board: Board): number {
    const size = board.length;
    let score = 0;
    
    // Đánh giá tất cả các hàng, cột và đường chéo
    // Các hướng để kiểm tra: ngang, dọc, chéo chính, chéo phụ
    const directions = [
      { dr: 0, dc: 1 },  // ngang
      { dr: 1, dc: 0 },  // dọc
      { dr: 1, dc: 1 },  // chéo chính
      { dr: 1, dc: -1 }, // chéo phụ
    ];
    
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== null) {
          const player = board[row][col];
          const playerScore = player === this.aiPlayer ? 1 : -1;
          
          for (const dir of directions) {
            let count = 1;
            let blocked = 0;
            let spaces = 0;
            
            // Đếm số quân cờ liên tiếp theo hướng thuận
            for (let i = 1; i < this.WIN_LENGTH; i++) {
              const r = row + dir.dr * i;
              const c = col + dir.dc * i;
              if (r >= 0 && r < size && c >= 0 && c < size) {
                if (board[r][c] === player) {
                  count++;
                } else if (board[r][c] === null) {
                  spaces++;
                  break;
                } else {
                  blocked++;
                  break;
                }
              } else {
                blocked++;
                break;
              }
            }
            
            // Đếm số quân cờ liên tiếp theo hướng ngược
            for (let i = 1; i < this.WIN_LENGTH; i++) {
              const r = row - dir.dr * i;
              const c = col - dir.dc * i;
              if (r >= 0 && r < size && c >= 0 && c < size) {
                if (board[r][c] === player) {
                  count++;
                } else if (board[r][c] === null) {
                  spaces++;
                  break;
                } else {
                  blocked++;
                  break;
                }
              } else {
                blocked++;
                break;
              }
            }
            
            // Tính điểm dựa trên số quân cờ liên tiếp, số phía bị chặn và số khoảng trống
            if (count >= this.WIN_LENGTH) {
              score += 1000 * playerScore; // Thắng
            } else if (count === this.WIN_LENGTH - 1 && blocked < 2) {
              score += 100 * playerScore; // Gần thắng
            } else if (count === this.WIN_LENGTH - 2 && blocked < 2) {
              score += 10 * playerScore; // Có tiềm năng
            } else if (count >= 2 && blocked < 2) {
              score += count * playerScore; // Điểm nhỏ
            }
            
            // Thưởng thêm cho các dãy có khoảng trống ở giữa (như X_X)
            if (count >= 2 && spaces > 0 && blocked < 2) {
              score += (count * 2) * playerScore;
            }
          }
        }
      }
    }
    
    return score;
  }

  private checkWinner(board: Board, lastRow: number, lastCol: number): Player {
    const size = board.length;
    const player = board[lastRow][lastCol];
    if (!player) return null;
    
    // Directions: horizontal, vertical, main diagonal, anti-diagonal
    const directions = [
      { dr: 0, dc: 1 },  // horizontal
      { dr: 1, dc: 0 },  // vertical
      { dr: 1, dc: 1 },  // main diagonal
      { dr: 1, dc: -1 }, // anti-diagonal
    ];
    
    for (const dir of directions) {
      let count = 1;
      
      // Check in forward direction
      for (let i = 1; i < this.WIN_LENGTH; i++) {
        const r = lastRow + dir.dr * i;
        const c = lastCol + dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          count++;
        } else {
          break;
        }
      }
      
      // Check in backward direction
      for (let i = 1; i < this.WIN_LENGTH; i++) {
        const r = lastRow - dir.dr * i;
        const c = lastCol - dir.dc * i;
        if (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          count++;
        } else {
          break;
        }
      }
      
      if (count >= this.WIN_LENGTH) {
        return player;
      }
    }
    
    return null;
  }

  private isBoardFull(board: Board): boolean {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          return false;
        }
      }
    }
    return true;
  }
}

export default TicTacToeAI; 