import BoardCell from "../cells/BoardCell";

function GridLayer({ board }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(15,1fr)",
      }}
    >
      {board.flat().map((cell) => (
        <BoardCell
          key={cell.id}
          cell={cell}
        />
      ))}
    </div>
  );
}

export default GridLayer;