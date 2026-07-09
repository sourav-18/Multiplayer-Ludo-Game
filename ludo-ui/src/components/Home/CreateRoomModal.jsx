import { useState } from "react";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import PlayerCount from "./PlayerCount";
import ColorPicker from "./ColorPicker";
import { AllState } from "../../context/Context";
import { handleCreateRoom } from "../../api/room.api";
import CopyText from "../common/CopyText";

function CreateRoomModal({
  open,
  onClose,
}) {
  const { state: { loginUserId } } = AllState();

  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [players, setPlayers] = useState(2);
  const [color, setColor] = useState("red");

  async function handleCreate() {
    const roomData = await handleCreateRoom(loginUserId, players);
    if (!roomData) return; //todo
    if (roomData.status === "error") {
      alert(roomData.message)
      onClose();
    } else if (roomData.status === "success") {
      setRoomId(roomData.data)
    }
  }

  async function handleClose(){
    setRoomId(null);
    setPlayers(2);
    onClose();
  }

  return (
    <Modal open={open}>
      <div className="space-y-6">

        <h2 className="text-3xl font-bold">
          Create Room
        </h2>
        {/* 
        <Input
          label="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}

        <div>
          <p className="mb-3 text-gray-400">
            Players
          </p>

          <PlayerCount
            value={players}
            onChange={setPlayers}
          />
        </div>

        {/* <div>
          <p className="mb-3 text-gray-400">
            Choose Color
          </p>

          <ColorPicker
            value={color}
            onChange={setColor}
          />
        </div> */}
        {roomId && <CopyText text={roomId} />}

        <div className="flex gap-3">

          {roomId === null ?
            <><Button
              className="flex-1 cursor-pointer"
              onClick={handleCreate}
            >
              Create
            </Button>

              <Button
                variant="secondary"
                className="flex-1 cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </> :

            <Button
              variant="secondary"
              className="flex-1 cursor-pointer"
              onClick={handleClose}
            >
              close
            </Button>}

        </div>

      </div>
    </Modal>
  );
}

export default CreateRoomModal;