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
import DiceMini from './DiceMini'
import { getColorFromColorId, makePawnFloating } from '../../utils/constant.util'
import { RoomEvent } from '../../utils/room.util'

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
    let map = new Map();
    for (let pawnItem of currentPawnState) {
      let color = getColorFromColorId(pawnItem.colorId);

      for (let [key, value] of Object.entries(pawnItem.pawn)) {
        if (value == 'home') continue;
        const pawnClassName = key + "-" + color;
        if (map.has(value)) {
          map.get(value).push(pawnClassName);
        } else {
          map.set(value, [pawnClassName]);
        }
      }
    }

    for (const [key, values] of map) {
      const cubeSpot = document.getElementsByClassName(key);
      if (cubeSpot.length !== 1) continue;
      values.forEach((pawn) => {
        const pawnElement = document.getElementsByClassName(pawn);
        if (pawnElement.length === 0) return;
        cubeSpot[0].appendChild(pawnElement[0]);
      })
      if (values.length > 1) {
        cubeSpot[0].classList.add('makeGrid')
      }
    }


  }, [currentPawnState])

  function initEvent() {
    const socket = socketRef.current;
    if (!socket) return;

    // socket.on(socketKey.on.playerPossiblePawnMove, (data) => {
    //   if (data.error) return;
    //   dispatch({ type: reducerAction.setPlayerPossiblePawnMoveData, payload: data.data })
    // })

    socket.on(socketKey.on.error, (data) => {
      if (data.error) {
        alert(data.message)
      }
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

    socket.on(socketKey.on.playerPossiblePawnMove, (data) => {
      if (data.error) return;
      handleFloatingPawn(data.data.colorId, data.data.possiblePawnMoves);
      if (playerId === data.data.playerId)
        dispatch({ type: reducerAction.setPlayerPossiblePawnMoveData, payload: data.data })
    })

    socket.on(socketKey.on.roomPlayerDiceRoll, (data) => {
      if (data.error) return;
      showDiceRoll(data.data.colorId);
    })

    socket.on(socketKey.on.roomPlayerDiceRoll, (data) => {
      if (data.error) return;
      showDiceRollValue(data.data.colorId, data.data.diceRollValue);
      handleFloatingPawn(data.data.colorId, data.data.possiblePawnMoves);
    })

    socket.on(socketKey.on.roomEventUpdate, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.setRoomEvent, payload: data.data.event })
      switch (data.data.event) {
        case RoomEvent.start:
          alert("game start")
          break;
        case RoomEvent.turnChange:
          dispatch({ type: reducerAction.setCurrentTurn, payload: data.data.playerId })
          break;
        default:
          break;
      }
    })

    socket.on(socketKey.on.roomPlayerPawnMove, (data) => {
      if (data.error) return;
      handleArrangePawnMoveState(data.data);
    })



  }

  function handleStartGame() {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit(socketKey.emit.roomStart);
  }

  function handlePawnMove(name) {
    if (!playerPossiblePawnMoveData) {
      return;
    }
    //check event is pawn move or not
    //todo validate all possible 
    const socket = socketRef.current;
    if (!socket) return;
    name = name.split('-');
    const color = name[1]
    const pawnNumber = name[0];
    const state = playerPossiblePawnMoveData.possiblePawnMoves[pawnNumber];
    socket.emit(socketKey.emit.pawnMove, { pawn: pawnNumber, state: state }, (response) => {
      if (response.success === true) {
      }
    })




  }

  async function handleDiceRoll() {
    const socket = socketRef.current;
    if (!socket) return;
    const responseData = await new Promise((resolve) => {
      socket.emit(socketKey.emit.playerDiceRoll, (response) => {
        if (response.error) {
          resolve(null);
          return;
        }
        resolve(response.data);
      })
    })
    return responseData;

  }

  async function showDiceRoll(colorId) {
    let color = getColorFromColorId(colorId);
    const dice = document.getElementById(`${color}-dice`);
    if (!dice) return;
    dice.classList.add('rolling');
  }

  async function showDiceRollValue(colorId, value) {
    let color = getColorFromColorId(colorId);
    const dice = document.getElementById(`${color}-dice`);
    if (!dice) return;
    dice.querySelectorAll('.visible-dice').forEach(element => {
      element.classList.remove('visible-dice');
    });
    dice.querySelector(`#D${value}`).classList.add('visible-dice');
  }

  function handleFloatingPawn(colorId, possiblePawnMoves) {
    if (!colorId || !possiblePawnMoves) return;
    const color = getColorFromColorId(colorId);
    if (!color) return;
    makePawnFloating(color, possiblePawnMoves);
  }

  function handleArrangePawnMoveState(moveData) {
    const color = getColorFromColorId(moveData.colorId);
    if (!color) return;
    const pawnClassName = moveData.pawn + "-" + color;
    const pawn = document.getElementsByClassName(pawnClassName);
    if (pawn.length === 0) return;
    const cubeSpot = document.getElementsByClassName(moveData.state);
    if (cubeSpot.length === 0) return;
    if (moveData.goHomeData) {
      handleGotoHome(moveData.goHomeData)
    }
    if (cubeSpot[0].children.length === 1) cubeSpot[0].classList.add("makeGrid")
    cubeSpot[0].appendChild(pawn[0]);
    document.querySelectorAll('.floating').forEach(element => {
      element.classList.remove('floating');
    });
    document.querySelectorAll('.rolling').forEach(element => {
      element.classList.remove('rolling');
    });
  }

  function handleGotoHome(goHomeData) {
    const color = getColorFromColorId(goHomeData.colorId);
    if (!color) return;
    const homeClassName = color + "-home"
    const cubeSpot = document.getElementsByClassName(homeClassName);
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
      <Dice handleDiceRoll={handleDiceRoll} />
      {(roomData?.ownerId == playerId && roomData?.event === 'pending') && < PrimaryButton name="Start" handler={handleStartGame} />}
    </>
  )
}

export default Game