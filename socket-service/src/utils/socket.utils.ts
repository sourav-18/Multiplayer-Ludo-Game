const common = {
    dealerStatus: 'dealer:status',
    dealerGameStart: 'dealer:game-start',
    dealerTurnChange: 'dealer:turn-change',
    dealerDiceRollTimerStart: 'dealer:dice-roll-timer-start',
    dealerPawnMoveTimerStart: 'dealer:pawn-move-timer-start',
    dealerTurnSet: 'dealer:turn-set',
    dealerTurnSetInitiated: 'dealer:turn-set-initiated',
    dealerAutoPawnMove: 'dealer:auto-pawn-move',
    dealerDiceRollComplete: 'dealer:dice-roll-complete',
    dealerAutoDiceRoll: 'dealer:auto-dice-roll',
    dealerGameComplete: 'dealer:game-complete',
    dealerSendPossiblePath: 'dealer:send-possible-path',
    // diceRoll
}

 const emit = {
    //game
    gameRoomUpdate: 'on::game:room-update',
    gameStatusUpdate: "on::game:status-update",
    gameEventUpdate: 'on::game:event-update',
    gameStartRemainingTime: 'on::game:start-remaining-time',
    gamePlayerOffline: 'on::game:player-offline',
    gamePlayerOnline: 'on::game:player-online',
    gamePlayerPawnMove: 'on::game:player-pawn-move',
    gamePlayerDiceRollValue: 'on::game:player-dice-roll-value',
    gamePlayerPawnBackToHome: 'on::game:player-pawn-back-to-home',
    gamePlayerDiceRollTimer: 'on::game:player-dice-roll-timer',
    gamePlayerPawnMoveTimer: 'on::game:player-pawn-move-timer',


    //plyer
    mydata: 'on::player:mydata',
    playerPossiblePawnMove: 'on::player:possible-pawn-move',
    playerCurrentPawnState: 'on::player:pawn-current-state',
    playerCheckCurrentTurn: 'on::player:check:current:turn',


    //dealer
    dealerStatus: common.dealerStatus,
    dealerGameStart: common.dealerGameStart,
    dealerTurnChange: common.dealerTurnChange,
    dealerTurnSet: common.dealerTurnSet,
    dealerAutoPawnMove: common.dealerAutoPawnMove,
    dealerDiceRollComplete: common.dealerDiceRollComplete,
    dealerDiceRollTimerStart: common.dealerDiceRollTimerStart,
    dealerPawnMoveTimerStart: common.dealerPawnMoveTimerStart,
    dealerAutoDiceRoll: common.dealerAutoDiceRoll,
    dealerTurnSetInitiated: common.dealerTurnSetInitiated,
    dealerGameComplete: common.dealerGameComplete,
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

    //game
    gameCurrentTurn: 'game:current:turn',

    //dealer
    dealerStatus: common.dealerStatus,
    dealerGameStart: common.dealerGameStart,
    dealerTurnChange: common.dealerTurnChange,
    dealerTurnSet: common.dealerTurnSet,
    dealerAutoPawnMove: common.dealerAutoPawnMove,
    dealerDiceRollComplete: common.dealerDiceRollComplete,
    dealerDiceRollTimerStart: common.dealerDiceRollTimerStart,
    dealerPawnMoveTimerStart: common.dealerPawnMoveTimerStart,
    dealerAutoDiceRoll: common.dealerAutoDiceRoll,
    dealerTurnSetInitiated: common.dealerTurnSetInitiated,
    dealerGameComplete: common.dealerGameComplete,
    dealerSendPossiblePath: common.dealerSendPossiblePath

}

const socketKey={
    emit,
    on
}

export default socketKey;

