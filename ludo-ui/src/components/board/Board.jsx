import React, { useEffect, useRef } from 'react'
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
import PrimaryButton from '../common/PrimaryButton'

function Game() {
  const params = useParams();
  const { state: { roomData }, dispatch } = AllState();
  const playerId = params.playerId;
  const roomId = params.roomId;
  const name = params.name;

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = initSocket(roomId, playerId, name);
    dispatch({ type: reducerAction.setPlayerId, payload: playerId })
    initEvent()

  }, [])

  function initEvent() {
    const socket = socketRef.current;
    if (!socket) return;

    socket.on(socketKey.on.playerPossiblePawnMove, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.setPlayerPossiblePawnMoveData, payload: data.data })
    })

    socket.on(socketKey.on.roomUpdate, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.roomUpdate, payload: data.data })
      if (data.data.currentTurn) {
        dispatch({ type: reducerAction.setCurrentTurn, payload: data.data.currentTurn })
      }
    })

    socket.on(socketKey.on.roomEventUpdate, (data) => {
      if (data.error) return;
      switch (data.event) {
        case 'start':
          break;
        case 'turnChange':
          dispatch({ type: reducerAction.setCurrentTurn, payload: data.playerId })
          break;
        default:
          break;
      }
    })


  }

  function handleStartGame() {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit(socketKey.emit.roomStart);
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
      <Dice />
      {(roomData?.ownerId == playerId && roomData?.status === 'pending') && < PrimaryButton name="Start" handler={handleStartGame} />}
    </>
  )
}

export default Game