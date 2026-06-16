export function fillRectangle(
  board,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  data
) {
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let col = colStart; col <= colEnd; col++) {
      board[row][col] = {
        ...board[row][col],
        ...data,
      };
    }
  }
}

export function paintCells(board, cells, data) {
  cells.forEach(([row, col]) => {
    board[row][col] = {
      ...board[row][col],
      ...data,
    };
  });
}