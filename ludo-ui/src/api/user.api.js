import { apiUrl } from "../utils/config.util"
import axios from "axios";

export const handleNewUserCreate = async () => {
    const response = await axios.post(apiUrl + "/users/guest");
    console.log(response)
    if (response.data.status === "success") {
        return response.data.data;
    }
    return null;
}