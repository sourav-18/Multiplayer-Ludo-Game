import Button from "../ui/Button";

function GameMenu({
  onCreate,
  onJoin,
  onReJoin
}) {
  return (
    <div className="mt-10 flex gap-5">
      <Button onClick={onCreate}>
        Create Room
      </Button>

      <Button
        variant="secondary"
        onClick={onJoin}
      >
        Join Room
      </Button>

      <Button
        variant="secondary"
        onClick={onReJoin}
      >
        Re Join Room
      </Button>
    </div>
  );
}

export default GameMenu;