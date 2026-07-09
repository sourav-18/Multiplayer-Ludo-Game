import { useState } from "react";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ColorPicker from "./ColorPicker";
import { useNavigate } from "react-router-dom";
import { AllState } from "../../context/Context";
import reducerAction from "../../utils/reducerAction.util";

function JoinRoomModal({
  open,
  onClose,
}) {

  const { state: { loginUserId }, dispatch } = AllState();
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("red");
  const navigation = useNavigate();
  const colorMap = {
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4
  }
  function handleJoinRoom() {
    if (!color) {
      alert("you have to select the color");
      return;
    }
    const name = "player-" + color;
    const colorId = colorMap[color];
    dispatch({ type: reducerAction.clearGameState })
    navigation(`/game/${roomId}/${loginUserId}/${colorId}/${name}`)
  }

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

          <Button className="flex-1 cursor-pointer" onClick={handleJoinRoom}>
            Join
          </Button>

          <Button
            variant="secondary"
            className="flex-1 cursor-pointer"
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