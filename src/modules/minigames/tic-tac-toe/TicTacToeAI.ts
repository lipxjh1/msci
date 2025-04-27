import { Board, Player, Difficulty, AIMove } from './types';

class TicTacToeAI {
  private difficulty: Difficulty;
  private aiPlayer: Player;
  private humanPlayer: Player;

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
    switch (this.difficulty) {
      case 'easy':
        return this.makeRandomMove(board);
      case 'medium':
        return Math.random() > 0.5
          ? this.makeSmartMove(board, 2)
          : this.makeRandomMove(board);
      case 'hard':
      default:
        return this.makeSmartMove(board, 5);
    }
  }

  private makeRandomMove(board: Board): AIMove {
    const availableMoves: AIMove[] = [];

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          availableMoves.push({ row, col });
        }
      }
    }

    if (availableMoves.length === 0) {
      throw new Error('No available moves');
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  private makeSmartMove(board: Board, depth: number): AIMove {
    let bestScore = -Infinity;
    let bestMove: AIMove = { row: -1, col: -1 };

    // Kiểm tra xem có nước đi nào thắng ngay không
    const winningMove = this.findWinningMove(board, this.aiPlayer);
    if (winningMove) return winningMove;

    // Nếu là mức độ trung bình, chặn người chơi nếu sắp thắng
    if (this.difficulty === 'medium') {
      const blockingMove = this.findWinningMove(board, this.humanPlayer);
      if (blockingMove) return blockingMove;
    }

    // Sử dụng minimax để tìm nước đi tốt nhất
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          // Thử nước đi
          board[row][col] = this.aiPlayer;
          const score = this.minimax(board, depth, false, -Infinity, Infinity);
          // Hoàn tác nước đi
          board[row][col] = null;

          if (score > bestScore) {
            bestScore = score;
            bestMove = { row, col };
          }
        }
      }
    }

    return bestMove;
  }

  private findWinningMove(board: Board, player: Player): AIMove | null {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === null) {
          // Thử nước đi
          board[row][col] = player;
          const winner = this.checkWinner(board);
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
    beta: number
  ): number {
    // Kiểm tra game kết thúc hoặc đạt độ sâu tối đa
    const winner = this.checkWinner(board);
    
    if (winner === this.aiPlayer) return 10 + depth;
    if (winner === this.humanPlayer) return -10 - depth;
    if (this.isBoardFull(board) || depth === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] === null) {
            board[row][col] = this.aiPlayer;
            const score = this.minimax(board, depth - 1, false, alpha, beta);
            board[row][col] = null;
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) break;
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
          if (board[row][col] === null) {
            board[row][col] = this.humanPlayer;
            const score = this.minimax(board, depth - 1, true, alpha, beta);
            board[row][col] = null;
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) break;
          }
        }
      }
      return bestScore;
    }
  }

  private checkWinner(board: Board): Player {
    const size = board.length;
    const winLength = 5; // Số ô liên tiếp cần để thắng 
    
    // Kiểm tra hàng ngang
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - winLength; col++) {
        const firstPlayer = board[row][col];
        if (firstPlayer) {
          let match = true;
          for (let i = 1; i < winLength; i++) {
            if (board[row][col + i] !== firstPlayer) {
              match = false;
              break;
            }
          }
          if (match) return firstPlayer;
        }
      }
    }

    // Kiểm tra hàng dọc
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - winLength; row++) {
        const firstPlayer = board[row][col];
        if (firstPlayer) {
          let match = true;
          for (let i = 1; i < winLength; i++) {
            if (board[row + i][col] !== firstPlayer) {
              match = false;
              break;
            }
          }
          if (match) return firstPlayer;
        }
      }
    }

    // Kiểm tra đường chéo chính (top-left to bottom-right)
    for (let row = 0; row <= size - winLength; row++) {
      for (let col = 0; col <= size - winLength; col++) {
        const firstPlayer = board[row][col];
        if (firstPlayer) {
          let match = true;
          for (let i = 1; i < winLength; i++) {
            if (board[row + i][col + i] !== firstPlayer) {
              match = false;
              break;
            }
          }
          if (match) return firstPlayer;
        }
      }
    }

    // Kiểm tra đường chéo phụ (top-right to bottom-left)
    for (let row = 0; row <= size - winLength; row++) {
      for (let col = winLength - 1; col < size; col++) {
        const firstPlayer = board[row][col];
        if (firstPlayer) {
          let match = true;
          for (let i = 1; i < winLength; i++) {
            if (board[row + i][col - i] !== firstPlayer) {
              match = false;
              break;
            }
          }
          if (match) return firstPlayer;
        }
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