import Button from "../ui/Button";

function GameMenu({
  onCreate,
  onJoin,
  onReJoin
}) {
  return (
    <div className="mt-10 flex gap-5">
      <Button onClick={onCreate} className="cursor-pointer">
        Create Room
      </Button>

      <Button
        variant="secondary"
        onClick={onJoin}
        className="cursor-pointer"
      >
        Join Room
      </Button>

      <Button
        variant="secondary"
        onClick={onReJoin}
        className="cursor-pointer"
      >
        Re Join Room
      </Button>
    </div>
  );
}

export default GameMenu;