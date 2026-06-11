import httpServer from "./app.js"
import { serverConfig } from "./utils/env.util.js"

httpServer.listen(serverConfig.PORT, () => {
    console.log("server running on port " + serverConfig.PORT)
})