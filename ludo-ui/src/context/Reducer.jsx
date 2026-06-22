import reducerAction from "../utils/reducerAction.util";

export default function Reducer(state, action) {
    switch (action.type) {
        case reducerAction.roomUpdate:
            return { ...state, roomData: action.payload }
        default:
            return state;
    }
}