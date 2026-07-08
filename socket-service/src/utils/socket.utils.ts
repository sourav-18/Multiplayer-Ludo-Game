const common = {
    dealerStatus: 'dealer:status',
    dealerRoomStart: 'dealer:room-start',
    dealerTurnChange: 'dealer:turn-change',
    dealerTurnChangeDone: 'dealer:turn-change-done',

    dealerPlayerActionTimer: 'dealer:player:action-timer',
    dealerDisconnect: 'dealer:disconnect',

    dealerDiceRollTimerStart: 'dealer:dice-roll-timer-start',
    dealerPawnMoveTimerStart: 'dealer:pawn-move-timer-start',
    dealerTurnSetReq: 'dealer:turn-set-Req',
    dealerTurnSetDone: 'dealer:turn-set-done',
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
    roomPlayerDiceRoll: 'on::room:player-dice-roll',
    roomPlayerPawnBackToHome: 'on::room:player-pawn-back-to-home',
    roomPlayerActionTimer: 'on::room:player-action-timer',
    roomPlayerDiceRollTimer: 'on::room:player-dice-roll-timer',
    roomPlayerPawnMoveTimer: 'on::room:player-pawn-move-timer',
    roomPlayerRank: 'on::room:player-rank',

    //plyer
    mydata: 'on::player:mydata',
    playerPossiblePawnMove: 'on::player:possible-pawn-move',
    playerCurrentPawnState: 'on::player:pawn-current-state',
    playerCheckCurrentTurn: 'on::player:check:current:turn',


    //dealer
    dealerStatus: common.dealerStatus,
    dealerRoomStart: common.dealerRoomStart,
    dealerTurnChange: common.dealerTurnChange,
    dealerTurnSetDone: common.dealerTurnSetDone,
    dealerAutoPawnMove: common.dealerAutoPawnMove,
    dealerDiceRollComplete: common.dealerDiceRollComplete,
    dealerDiceRollTimerStart: common.dealerDiceRollTimerStart,
    dealerPawnMoveTimerStart: common.dealerPawnMoveTimerStart,
    dealerAutoDiceRoll: common.dealerAutoDiceRoll,
    dealerTurnSetInitiated: common.dealerTurnSetInitiated,
    dealerRoomComplete: common.dealerRoomComplete,
    dealerSendPossiblePath: common.dealerSendPossiblePath,
    dealerPlayerActionTimer: common.dealerPlayerActionTimer,
    dealerTurnChangeDone: common.dealerTurnChangeDone,
    dealerTurnSetReq: common.dealerTurnSetReq,
    dealerDisconnect:common.dealerDisconnect,


    //error

    error: "on::error"
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
    roomStart: 'room:start',
    roomCurrentTurn: 'room:current:turn',

    //dealer
    dealerStatus: common.dealerStatus,
    dealerRoomStart: common.dealerRoomStart,
    dealerTurnChange: common.dealerTurnChange,
    dealerTurnSetDone: common.dealerTurnSetDone,
    dealerAutoPawnMove: common.dealerAutoPawnMove,
    dealerDiceRollComplete: common.dealerDiceRollComplete,
    dealerDiceRollTimerStart: common.dealerDiceRollTimerStart,
    dealerPawnMoveTimerStart: common.dealerPawnMoveTimerStart,
    dealerAutoDiceRoll: common.dealerAutoDiceRoll,
    dealerTurnSetInitiated: common.dealerTurnSetInitiated,
    dealerRoomComplete: common.dealerRoomComplete,
    dealerSendPossiblePath: common.dealerSendPossiblePath,
    dealerPlayerActionTimer: common.dealerPlayerActionTimer,
    dealerTurnChangeDone: common.dealerTurnChangeDone,
    dealerTurnSetReq: common.dealerTurnSetReq,
    dealerDisconnect:common.dealerDisconnect

}

const socketKey = {
    emit,
    on,
}



export default socketKey;

