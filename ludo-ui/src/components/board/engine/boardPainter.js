import { PLAYER_COLORS } from "./boardConfig";

export function paintHomes(board) {
  paintSquare(board, 0, 0, PLAYER_COLORS.red);

  paintSquare(board, 0, 9, PLAYER_COLORS.green);

  paintSquare(board, 9, 0, PLAYER_COLORS.blue);

  paintSquare(board, 9, 9, PLAYER_COLORS.yellow);
}

function paintSquare(board, row, col, color) {
  for (let r = row; r < row + 6; r++) {
    for (let c = col; c < col + 6; c++) {
      board[r][c].color = color;

      board[r][c].isHome = true;
    }
  }
}