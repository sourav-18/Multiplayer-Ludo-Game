import Cell from "./Cell";

function BoardGrid({ board }) {

  return (

    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(15,1fr)"
      }}
    >

      {board.flat().map((cell) => (

        <Cell
          key={cell.id}
          cell={cell}
        />

      ))}

    </div>

  );

}

export default BoardGrid;