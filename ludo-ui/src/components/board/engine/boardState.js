export function createCell(row, col) {
  return {
    id: `${row}-${col}`,
    row,
    col,

    type: "empty",

    color: null,

    isSafe: false,

    isHome: false,

    isHomePath: false,

    isCenter: false,

    token: null,

    highlight: false,
  };
}