import { BOARD_SIZE } from "./boardConfig";

import { createCell } from "./boardState";

import { paintHomes } from "./boardPainter";

export function generateBoard() {
  const board = Array.from(
    {
      length: BOARD_SIZE,
    },
    (_, row) =>
      Array.from(
        {
          length: BOARD_SIZE,
        },
        (_, col) => createCell(row, col)
      )
  );

  paintHomes(board);

  return board;
}