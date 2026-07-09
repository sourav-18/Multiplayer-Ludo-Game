import Button from "../ui/Button";

function GameMenu({
  onCreate,
  onJoin,
  onReJoin
}) {
  return (
    <div className="mt-10 flex gap-5">
      <Button onClick={onCreate} className="cursor-pointer z-10">
        Create Room
      </Button>

      <Button
        variant="secondary"
        onClick={onJoin}
        className="cursor-pointer z-10"
      >
        Join Room
      </Button>

      <Button
        variant="secondary"
        onClick={onReJoin}
        className="cursor-pointer z-10"
      >
        Re Join Room
      </Button>
    </div>
  );
}

export default GameMenu;