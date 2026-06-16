import { useState } from "react";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

function JoinRoomModal({
  open,
  onClose,
}) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  return (
    <Modal open={open}>
      <div className="space-y-6">

        <h2 className="text-3xl font-bold">
          Join Room
        </h2>

        <Input
          label="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <Input
          label="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-3">

          <Button className="flex-1">
            Join
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

export default JoinRoomModal;