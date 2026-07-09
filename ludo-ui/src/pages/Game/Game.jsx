import Board from "../../components/board/Board";
import bgImage from "../../assets/bg.png";
function Game() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#090B1A]/70 via-[#0F172A]/55 to-[#1E1B4B]/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Board />
      </div>
    </div>

    // <div
    //   className="min-h-screen bg-cover bg-center bg-no-repeat relative"
    //   style={{ backgroundImage: `url(${bgImage})` }}
    // >
    //   <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

    //   <div className="relative z-10">
    //     <Board />
    //   </div>
    // </div>
  );
}

export default Game;