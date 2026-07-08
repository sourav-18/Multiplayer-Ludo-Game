import { apiUrl } from "../utils/config.util"
import axios from "axios";

export const handleCreateRoom = async (userId, numberOfPlayer) => {
    const response = await axios.post(apiUrl + "/rooms", {
        numberOfPlayer: numberOfPlayer
    }, {
        headers: {
            "user-id": userId
        }
    });
    return response.data;
}

export const getRejoinData = async (userId, roomId) => {
    const response = await axios.get(apiUrl + `/rooms/rejoin/${roomId}`, {
        headers: {
            "user-id": userId
        }
    });
    return response.data;
}