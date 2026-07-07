import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
const allState = createContext();

function Context({ children }) {
    const [state, dispatch] = useReducer(Reducer, {
        roomData: null,
        playerId: null,
        currentTurn: null,
        playerPossiblePawnMoveData: null,
        autoPlay: null,
        currentPawnState: [],
        loginUserId: null,
        playerTimerDetails: null,
        redRank: null,
        greenRank: null,
        yellowRank: null,
        blueRank: null,
    })
    return (
        <allState.Provider value={{ state, dispatch }}>
            {children}
        </allState.Provider>
    )
}
export default Context;
export const AllState = () => {
    return useContext(allState)
}