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
    diceRoll = "diceRoll",
    pawnMove = "pawnMove",
    completed = 'completed'
}

export const pawnData = {
    home: 'home',
    completed: 'home-6',
    itemKey: ["one", "two", "three", "four"],
    noMoveKey: "noPawn",
    noMoveValue: "noMove",
    noMove: "no_move"
}