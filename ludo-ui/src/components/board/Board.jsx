import BackgroundLayer from "./layers/BackgroundLayer";
import GridLayer from "./layers/GridLayer";
import HighlightLayer from "./layers/HighlightLayer";
import TokenLayer from "./layers/TokenLayer";

import { generateBoard } from "./engine/boardGenerator";

function Board() {

  const board = generateBoard();

  return (

    <div
      className="
      relative
      w-[760px]
      aspect-square
      "
    >

      <BackgroundLayer />

      <GridLayer board={board} />

      <HighlightLayer />

      <TokenLayer />

    </div>

  );

}

export default Board;