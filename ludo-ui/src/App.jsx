import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { handleNewUserCreate } from "./api/user.api";
import { AllState } from "./context/Context";
import reducerAction from "./utils/reducerAction.util";

function App() {
  const { dispatch } = AllState();

  useEffect(() => {
    handSetUser();

  }, [])

  async function handSetUser() {
    let userId = localStorage.getItem("user-id");
    if (!userId) {
      userId = await handleNewUserCreate();
      localStorage.setItem("user-id", userId);
    }
    dispatch({ type: reducerAction.setLoginUserId, payload: userId })
  }

  return <AppRoutes />;
}

export default App;