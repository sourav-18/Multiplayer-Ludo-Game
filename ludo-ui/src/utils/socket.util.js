const on = {

    //error
    error: "on::error",

    //room
    roomUpdate: 'on::room-update',
    roomStatusUpdate: "on::room:status-update",
    roomEventUpdate: 'on::room:event-update',
    roomStartRemainingTime: 'on::room:start-remaining-time',
    roomPlayerJoin: 'on::room:player-join',
    roomPlayerOffline: 'on::room:player-offline',
    roomPlayerOnline: 'on::room:player-online',
    roomPlayerPawnMove: 'on::room:player-pawn-move',
    roomPlayerDiceRollValue: 'on::room:player-dice-roll-value',
    roomPlayerPawnBackToHome: 'on::room:player-pawn-back-to-home',
    roomPlayerDiceRollTimer: 'on::room:player-dice-roll-timer',
    roomPlayerPawnMoveTimer: 'on::room:player-pawn-move-timer',


    //plyer
    mydata: 'on::player:mydata',
    playerPossiblePawnMove: 'on::player:possible-pawn-move',
    playerCurrentPawnState: 'on::player:pawn-current-state',
    playerCheckCurrentTurn: 'on::player:check:current:turn',



    //error

    error: "on::error"
}

const emit = {
    //player
    mydata: 'player:req-mydata',
    pawnMove: 'player:pawn-move',
    playerPossiblePawnMove: 'player:possible-pawn-move',
    playerCurrentPawnState: 'player:pawn-current-state',
    playerCheckCurrentTurn: 'player:check:current:turn',
    playerDiceRoll: 'player:dice-roll',

    //room
    roomCurrentTurn: 'room:current:turn',
    roomStart: 'room:start',

}

const socketKey = {
    emit,
    on,
}



export default socketKey;

