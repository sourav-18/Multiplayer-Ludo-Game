import {
  CELL_TYPES,
} from "./boardConstants";

function Cell({ cell }) {
  let bg = "#1A1A2E";

  switch (cell.type) {
    case CELL_TYPES.HOME:
      bg = cell.color;
      break;

    case CELL_TYPES.PATH:
      bg = "#F8F8F8";
      break;

    case CELL_TYPES.CENTER:
      bg = "#FFFFFF";
      break;

    default:
      bg = "#1A1A2E";
  }

  return (
    <div
      className="aspect-square border border-[#2A2A40]"
      style={{
        background: bg,
      }}
    />
  );
}

export default Cell;