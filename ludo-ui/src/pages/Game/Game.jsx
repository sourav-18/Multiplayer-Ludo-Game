import { useParams } from "react-router-dom";

function Game() {
  const { roomId } = useParams();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Game : {roomId}
      </h1>
    </div>
  );
}

export default Game;