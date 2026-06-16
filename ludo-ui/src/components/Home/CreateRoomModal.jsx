import { useState } from "react";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import PlayerCount from "./PlayerCount";
import ColorPicker from "./ColorPicker";

function CreateRoomModal({
  open,
  onClose,
}) {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState(2);
  const [color, setColor] = useState("red");

  function handleCreate() {
    console.log({
      name,
      players,
      color,
    });

    onClose();
  }

  return (
    <Modal open={open}>
      <div className="space-y-6">

        <h2 className="text-3xl font-bold">
          Create Room
        </h2>

        <Input
          label="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <p className="mb-3 text-gray-400">
            Players
          </p>

          <PlayerCount
            value={players}
            onChange={setPlayers}
          />
        </div>

        <div>
          <p className="mb-3 text-gray-400">
            Choose Color
          </p>

          <ColorPicker
            value={color}
            onChange={setColor}
          />
        </div>

        <div className="flex gap-3">

          <Button
            className="flex-1"
            onClick={handleCreate}
          >
            Create
          </Button>

          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>

        </div>

      </div>
    </Modal>
  );
}

export default CreateRoomModal;