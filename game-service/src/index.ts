import app from "./app.js";
import { serverConfig } from "./utils/env.util.js";

app.listen(serverConfig.PORT, () => {
    console.log("server running on port " + serverConfig.PORT)
})