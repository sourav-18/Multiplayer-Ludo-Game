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
        case reducerAction.autoPlay:
            console.log(action.payload)
            return { ...state, autoPlay: action.payload }
        case reducerAction.setLoginUserId:
            return { ...state, loginUserId: action.payload }
        case reducerAction.setPlayerTimerDetails:
            return { ...state, playerTimerDetails: action.payload }
        case reducerAction.setRoomEvent:
            state.roomData.event = action.payload
            return state;
        case reducerAction.setRedRank:
            return { ...state, redRank: action.payload }
        case reducerAction.setGreenRank:
            return { ...state, GreenRank: action.payload }
        case reducerAction.setYellowRank:
            return { ...state, yellowRank: action.payload }
        case reducerAction.setBlueRank:
            return { ...state, blueRank: action.payload }
        default:
            return state;
    }
}