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
  const { state: { roomData, playerPossiblePawnMoveData, currentPawnState }, dispatch } = AllState();
  const playerId = params.playerId;
  const roomId = params.roomId;
  const name = params.name;

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = initSocket(roomId, playerId, name);
    dispatch({ type: reducerAction.setPlayerId, payload: playerId })
    initEvent()

  }, [])

  useEffect(() => {
    if (currentPawnState === null || currentPawnState.length === 0) return;

    for (let pawnItem of currentPawnState) {
      let color = "red";
      if (pawnItem.colorId === 2) {
        color = 'green';
      } else if (pawnItem.colorId === 3) {
        color = 'yellow';
      } else if (pawnItem.colorId === 4) {
        color = 'blue';
      }

      for (let [key, value] of Object.entries(pawnItem.pawn)) {
        if (value == 'home') continue;
        const pawnClassName = key + "-" + color;
        const pawn = document.getElementsByClassName(pawnClassName);
        if (pawn.length !== 1) continue;
        const cubeSpot = document.getElementsByClassName(value);
        if (cubeSpot.length !== 1) continue;
        cubeSpot[0].appendChild(pawn[0]); // if it's same sport some class list add
      }

    }

  }, [currentPawnState])

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

    socket.on(socketKey.on.playerCurrentPawnState, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.setCurrentPawnState, payload: data.data })
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

  function handlePawnMove(name) {
    //todo validate all possible 
    const socket = socketRef.current;
    if (!socket) return;
    name = name.split('-');
    const color=name[1]
    const pawnNumber=name[0];
    const state = playerPossiblePawnMoveData.possiblePawnMoves[pawnNumber];
    socket.emit(socketKey.emit.pawnMove, { pawn: pawnNumber, state: state }, (response) => {
      if (response.success === true) {
        console.log("enter---------------")
        const pawnClassName = pawnNumber + "-" + color;
        const pawn = document.getElementsByClassName(pawnClassName);
        const cubeSpot = document.getElementsByClassName(state);
        cubeSpot[0].appendChild(pawn[0]); // if it's same sport some class list add
      }
    })




  }

  return (
    <>
      <div className="game-board-container">
        <div className="game-board">
          <FirstHalf handlePawnMove={handlePawnMove} />
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