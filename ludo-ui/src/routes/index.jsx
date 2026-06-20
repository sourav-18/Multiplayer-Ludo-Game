import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import Game from "../pages/Game/Game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

export default router;