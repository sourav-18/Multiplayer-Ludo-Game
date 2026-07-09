import { useState } from "react";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ColorPicker from "./ColorPicker";
import { useNavigate } from "react-router-dom";
import { AllState } from "../../context/Context";
import { getRejoinData } from "../../api/room.api";
import reducerAction from "../../utils/reducerAction.util";

function ReJoinRoomModal({
  open,
  onClose,
}) {

  const { state: { loginUserId }, dispatch } = AllState();
  const [roomId, setRoomId] = useState("");

  const navigation = useNavigate();
  async function handleReJoinRoom() {
    if (!roomId) {
      alert("room id is required");
      return;
    }
    const response = await getRejoinData(loginUserId, roomId);
    if (response.status === "error") {
      alert(response.message)
      onClose();
    } else if (response.status === "success") {
      dispatch({ type: reducerAction.clearGameState })
      navigation(`/game/${roomId}/${loginUserId}/${response.data.colorId}/${response.data.name}`)
    }
  }

  return (
    <Modal open={open}>
      <div className="space-y-6">

        <h2 className="text-3xl font-bold">
          Re Join Room
        </h2>

        <Input
          label="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <div className="flex gap-3">

          <Button className="flex-1 cursor-pointer" onClick={handleReJoinRoom}>
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

export default ReJoinRoomModal;