import clsx from "clsx";

function BoardCell({ cell }) {
  return (
    <div
      className={clsx(
        "aspect-square",
        "border border-[#2A2A40]",
        "transition-all duration-200",

        cell.isHome &&
          "shadow-inner",

        cell.highlight &&
          "ring-2 ring-yellow-400"
      )}
      style={{
        background:
          cell.color ??
          "#10101A",
      }}
    />
  );
}

export default BoardCell;