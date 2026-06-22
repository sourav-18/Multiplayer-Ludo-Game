import React, { useEffect } from 'react'
import FirstHalf from './FirstHalf'
import MidHalf from './MidHalf'
import "./board.css"
import LastHalf from './LastHalf'
import { useParams } from 'react-router-dom'
import socket, { initSocket } from '../../socket/socket'
import { AllState } from '../../context/Context'
import reducerAction from '../../utils/reducerAction.util'
import Dice from './Dice'
import socketKey from '../../utils/socket.util'

function Game() {
  const params = useParams();
  const { dispatch } = AllState();

  useEffect(() => {
    const roomId = params.roomId;
    const playerId = params.playerId;
    const name = params.name;

    const socket = initSocket(roomId, playerId,name);
    dispatch({ type: reducerAction.playerId, payload: playerId })
    initEvent(socket)

  }, [])

  function initEvent(socket) {
    if (!socket) return;
    socket.on(socketKey.on.roomUpdate, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.roomUpdate, payload: data.data })
    })
  }

  return (
    <>
    <div className="game-board-container">
      <div className="game-board">
        <FirstHalf />
        <MidHalf />
        <LastHalf />
      </div>
    </div>
        <Dice/>
    </>
  )
}

export default Game