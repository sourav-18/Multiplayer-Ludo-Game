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
      let color = getColorFromColorId(pawnItem.colorId);
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
      if (data.data.event === 'diceRoll') {
        handleDiceRollEventState(data.data)
      }
    })

    socket.on(socketKey.on.playerCurrentPawnState, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.setCurrentPawnState, payload: data.data })
    })

    socket.on(socketKey.on.playerPossiblePawnMove, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.setPlayerPossiblePawnMoveData, payload: data.data })
    })

    socket.on(socketKey.on.roomPlayerDiceRoll, (data) => {
      if (data.error) return;
      showDiceRoll(data.data.colorId);
    })

    socket.on(socketKey.on.roomPlayerDiceRollValue, (data) => {
      if (data.error) return;
      showDiceRollValue(data.data.colorId, data.data.diceRollValue);
    })

    socket.on(socketKey.on.roomEventUpdate, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.setRoomEvent, payload: data.data.event })
      switch (data.data.event) {
        case 'start':
          alert("game start")
          break;
        case 'turnChange':
          dispatch({ type: reducerAction.setCurrentTurn, payload: data.data.playerId })
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
    if (!playerPossiblePawnMoveData) {
      return;
    }
    //check event is pawn move or not
    //todo validate all possible 
    console.log("handle pawn move")
    const socket = socketRef.current;
    if (!socket) return;
    name = name.split('-');
    const color = name[1]
    const pawnNumber = name[0];
    const state = playerPossiblePawnMoveData.possiblePawnMoves[pawnNumber];
    socket.emit(socketKey.emit.pawnMove, { pawn: pawnNumber, state: state }, (response) => {
      if (response.success === true) {
        const pawnClassName = pawnNumber + "-" + color;
        const pawn = document.getElementsByClassName(pawnClassName);
        const cubeSpot = document.getElementsByClassName(state);
        cubeSpot[0].appendChild(pawn[0]); // if it's same sport some class list add
        document.querySelectorAll('.floating').forEach(element => {
          element.classList.remove('floating');
        });
        document.querySelectorAll('.rolling').forEach(element => {
          element.classList.remove('rolling');
        });
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
    dice.querySelector(`#D${value}`).classList.add('visible-dice');
  }

  function handleDiceRollEventState(roomData) {
    if (!roomData || roomData.players.length === 0) {
      return;
    }
    const player = roomData.players.find((player) => player.id === roomData.currentTurn);
    if (!player) return;
    const color = getColorFromColorId(player.colorId);
    if (!color) return;

    makePawnFloating(color, player.pawn);

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