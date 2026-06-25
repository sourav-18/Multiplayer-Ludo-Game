const common = {
    dealerStatus: 'dealer:status',
    dealerRoomStart: 'dealer:room-start',
    dealerTurnChange: 'dealer:turn-change',
    dealerDiceRollTimerStart: 'dealer:dice-roll-timer-start',
    dealerPawnMoveTimerStart: 'dealer:pawn-move-timer-start',
    dealerTurnSet: 'dealer:turn-set',
    dealerTurnSetInitiated: 'dealer:turn-set-initiated',
    dealerAutoPawnMove: 'dealer:auto-pawn-move',
    dealerDiceRollComplete: 'dealer:dice-roll-complete',
    dealerAutoDiceRoll: 'dealer:auto-dice-roll',
    dealerRoomComplete: 'dealer:room-complete',
    dealerSendPossiblePath: 'dealer:send-possible-path',
    // diceRoll
}

const emit = {
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


    //dealer
    dealerStatus: common.dealerStatus,
    dealerRoomStart: common.dealerRoomStart,
    dealerTurnChange: common.dealerTurnChange,
    dealerTurnSet: common.dealerTurnSet,
    dealerAutoPawnMove: common.dealerAutoPawnMove,
    dealerDiceRollComplete: common.dealerDiceRollComplete,
    dealerDiceRollTimerStart: common.dealerDiceRollTimerStart,
    dealerPawnMoveTimerStart: common.dealerPawnMoveTimerStart,
    dealerAutoDiceRoll: common.dealerAutoDiceRoll,
    dealerTurnSetInitiated: common.dealerTurnSetInitiated,
    dealerRoomComplete: common.dealerRoomComplete,
    dealerSendPossiblePath: common.dealerSendPossiblePath,

    //error

    error:"on::error"
}

 const on = {
    //player
    mydata: 'player:req-mydata',
    pawnMove: 'player:pawn-move',
    playerPossiblePawnMove: 'player:possible-pawn-move',
    playerCurrentPawnState: 'player:pawn-current-state',
    playerCheckCurrentTurn: 'player:check:current:turn',
    playerDiceRoll: 'player:dice-roll',
    
    //room
    roomStart:'room:start',
    roomCurrentTurn: 'room:current:turn',

    //dealer
    dealerStatus: common.dealerStatus,
    dealerRoomStart: common.dealerRoomStart,
    dealerTurnChange: common.dealerTurnChange,
    dealerTurnSet: common.dealerTurnSet,
    dealerAutoPawnMove: common.dealerAutoPawnMove,
    dealerDiceRollComplete: common.dealerDiceRollComplete,
    dealerDiceRollTimerStart: common.dealerDiceRollTimerStart,
    dealerPawnMoveTimerStart: common.dealerPawnMoveTimerStart,
    dealerAutoDiceRoll: common.dealerAutoDiceRoll,
    dealerTurnSetInitiated: common.dealerTurnSetInitiated,
    dealerRoomComplete: common.dealerRoomComplete,
    dealerSendPossiblePath: common.dealerSendPossiblePath

}

const socketKey={
    emit,
    on,
}



export default socketKey;

