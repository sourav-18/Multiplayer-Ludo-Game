import {
    BOARD_SIZE,
    CELL_TYPES,
    PLAYER_COLORS,
} from "./boardConstants";

import {
    fillRectangle,
} from "./boardHelpers";

export function generateBoard() {
    const board = Array.from(
        { length: BOARD_SIZE },
        (_, row) =>
            Array.from(
                { length: BOARD_SIZE },
                (_, col) => ({
                    id: `${row}-${col}`,
                    row,
                    col,

                    type: CELL_TYPES.EMPTY,

                    color: null,

                    safe: false,

                    token: null,
                })
            )
    );

    // RED
    fillRectangle(
        board,
        0,
        5,
        0,
        5,
        {
            type: CELL_TYPES.HOME,
            color: PLAYER_COLORS.red,
        }
    );

    // GREEN
    fillRectangle(
        board,
        0,
        5,
        9,
        14,
        {
            type: CELL_TYPES.HOME,
            color: PLAYER_COLORS.green,
        }
    );

    // BLUE
    fillRectangle(
        board,
        9,
        14,
        0,
        5,
        {
            type: CELL_TYPES.HOME,
            color: PLAYER_COLORS.blue,
        }
    );

    // YELLOW
    fillRectangle(
        board,
        9,
        14,
        9,
        14,
        {
            type: CELL_TYPES.HOME,
            color: PLAYER_COLORS.yellow,
        }
    );

    return board;
}