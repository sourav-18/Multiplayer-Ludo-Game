import reducerAction from "../utils/reducerAction.util";

export default function Reducer(state, action) {
    switch (action.type) {
        case reducerAction.roomUpdate:
            return { ...state, roomData: action.payload }
        case reducerAction.setPlayerId:
            return { ...state, playerId: action.payload }
        case reducerAction.setCurrentTurn:
            return { ...state, currentTurn: action.payload }
        case reducerAction.setPlayerPossiblePawnMoveData:
            return { ...state, playerPossiblePawnMoveData: action.payload }
        case reducerAction.setCurrentPawnState:
            return { ...state, currentPawnState: action.payload }
        default:
            return state;
    }
}