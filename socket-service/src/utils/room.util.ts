export enum RoomStatus {
    pending = "pending",
    live = 'live',
    completed = 'completed'
}

export enum RoomEvent {
    pending = "pending",
    start = "start",
    turnSet = 'turnSet',
    turnChange = "turnChange",
    sendPossiblePath = "sendPossiblePath",
    diceRoll = "diceRoll",
    pawnMove = "pawnMove",
    completed = 'completed'
}
