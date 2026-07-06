import { apiUrl } from "../utils/config.util"
import axios from "axios";

export const handleCreateRoom = async (userId, numberOfPlayer) => {
    const response = await axios.post(apiUrl + "/rooms", {
        userId: userId,
        numberOfPlayer: numberOfPlayer
    });
    return response.data;
}