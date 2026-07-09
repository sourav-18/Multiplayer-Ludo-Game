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
import PlayerDiceCard from './PlayerDiceCard'
import pawnMoveAudio from "../../assets/sounds/pawn-move.mp3"
import wonAudio from "../../assets/sounds/won.mp3"
import UseSound from '../common/UseSound'

function Game() {
  const pawnMoveSound = UseSound(pawnMoveAudio);
  const wonSound = UseSound(wonAudio);
  const params = useParams();
  const { state: { roomData, playerPossiblePawnMoveData, currentPawnState, autoPlay, currentTurn }, dispatch } = AllState();
  const playerId = params.playerId;
  const roomId = params.roomId;
  const colorId = params.colorId;
  const name = params.name;

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = initSocket(roomId, playerId, colorId, name);
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

  useEffect(() => {
    if (autoPlay != null) {
      handleAutoPlay();
    }
  }, [autoPlay])


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
      for (const player of data.data.players) {
        setRank(player.colorId, player.rank);
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
      // if (Object.keys(data.data.possiblePawnMoves).length === 1) {
      //   const pawn = Object.keys(data.data.possiblePawnMoves)[0];
      //   handleAutoPawnMove(pawn, data.data.possiblePawnMoves[pawn])
      // }
      if (playerId === data.data.playerId) {
        handleFloatingPawn(data.data.colorId, data.data.possiblePawnMoves);
      }
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
        case RoomEvent.completed:
          alert("game is completed")
          break;
        default:
          break;
      }
    })

    socket.on(socketKey.on.roomPlayerPawnMove, (data) => {
      if (data.error) return;
      handleArrangePawnMoveStateV2(data.data);
    })

    socket.on(socketKey.on.roomPlayerActionTimer, (data) => {
      if (data.error) return;
      dispatch({ type: reducerAction.setPlayerTimerDetails, payload: data.data })
    })

    socket.on(socketKey.on.roomPlayerRank, (data) => {
      if (data.error) return;
      setRank(data.data.colorId, data.data.rank)
      wonSound();
    })




  }

  function handleStartGame() {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit(socketKey.emit.roomStart);
  }

  function handlePawnMove(name, colorId) {
    console.log({ name, colorId })
    if (!playerPossiblePawnMoveData) {
      return;
    }
    if (playerPossiblePawnMoveData.colorId !== colorId) return;
    const socket = socketRef.current;
    if (!socket) return;
    name = name.split('-');
    const pawnNumber = name[0];
    console.log(name)
    const state = playerPossiblePawnMoveData.possiblePawnMoves[pawnNumber];
    if (!state) return;
    socket.emit(socketKey.emit.pawnMove, { pawn: pawnNumber, state: state }, (response) => {
      if (response.success === true) {
      }
    })

    dispatch({ type: reducerAction.setPlayerPossiblePawnMoveData, payload: null })


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
    await new Promise((resolve) => setTimeout(resolve, 200));
    document.querySelectorAll('.rolling').forEach(element => {
      element.classList.remove('rolling');
    });
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
    console.log("enter")
    if (!colorId || !possiblePawnMoves) return;
    const color = getColorFromColorId(colorId);
    if (!color) return;
    makePawnFloating(color, possiblePawnMoves);
  }

  async function handleArrangePawnMoveStateV2(moveData) {
    if (moveData.pawn === "noPawn") return;
    const color = getColorFromColorId(moveData.colorId);
    if (!color) return;
    const pawnClassName = moveData.pawn + "-" + color;
    let pawn = document.getElementsByClassName(pawnClassName);
    if (pawn.length !== 1) return;

    document.querySelectorAll('.floating').forEach(element => {
      element.classList.remove('floating');
    });

    pawn = pawn[0];
    const previousCubeSpot = pawn.parentElement;
    const colorPath = color + "Path";

    if (previousCubeSpot.classList.contains(colorPath + 0)) { // for new pawn 
      const cubeSpot = document.getElementsByClassName(colorPath + 1)
      cubeSpot[0].appendChild(pawn)
      if (cubeSpot[0].children.length > 1 && !cubeSpot[0].classList.contains("makeGrid")) {
        cubeSpot[0].classList.add("makeGrid")
      }

    } else {
      let colorPathNumber = Array.from(previousCubeSpot.classList).find((item) => {
        return item.includes(colorPath);
      });
      if (!colorPathNumber) return;

      colorPathNumber = Number(colorPathNumber.split(colorPath)[1]);

      await cubeSportMove(colorPathNumber, colorPathNumber + moveData.diceRollValue, colorPath, pawn, false);
      if (moveData.goHomeData) {
        await handleGotoHome(moveData.goHomeData);
        let cubeSpot = document.getElementsByClassName(moveData.state);
        if (cubeSpot.length === 1 && cubeSpot[0].classList.contains('makeGrid')) {
          cubeSpot[0].classList.remove('makeGrid')
        }
      }
    }
  }

  async function cubeSportMove(start, target, pathName, pawn, isReverse) {
    // console.log({ start, target })
    if (isReverse === false && start >= target) {
      return;
    }
    if (isReverse === true && start < target) {
      return;
    }

    let previousSpot = document.getElementsByClassName(pathName + start);
    if (previousSpot.length === 1) {
      previousSpot = previousSpot[0];
      if (previousSpot.children.length === 2 && previousSpot.classList.contains("makeGrid"))
        previousSpot.classList.remove("makeGrid");
    }
    start = isReverse ? start - 1 : start + 1;
    let cubeSpot = document.getElementsByClassName(pathName + start);
    if (cubeSpot.length !== 1) return;
    cubeSpot = cubeSpot[0];
    cubeSpot.appendChild(pawn);
    if (start == 57) {
      cubeSpot.classList.add('home-effect');
      setTimeout(() => {
        cubeSpot.classList.remove('home-effect');
      }, 700)
    }
    if (!isReverse) { pawnMoveSound() };

    if (cubeSpot.children.length > 1 && !cubeSpot.classList.contains("makeGrid"))
      cubeSpot.classList.add("makeGrid");
    // else if (cubeSpot.classList.contains("makeGrid"))
    //   cubeSpot.classList.remove("makeGrid");
    const time = isReverse ? 30 : 300;
    await new Promise((resolve) => setTimeout(resolve, time));
    await cubeSportMove(start, target, pathName, pawn, isReverse)
  }

  async function handleGotoHome(goHomeData) {
    const color = getColorFromColorId(goHomeData.colorId);
    if (!color) return;

    for (const pawnData of goHomeData.pawnHomeData) {
      //todo cubeSportMove v2
      const homeClassName = color + "-home-" + pawnData.pawn;
      const cubeSpot = document.getElementsByClassName(homeClassName);
      if (cubeSpot.length === 0) continue;
      const pawnClassName = pawnData.pawn + "-" + color
      let pawn = document.getElementsByClassName(pawnClassName);
      if (pawn.length === 0) continue;
      pawn = pawn[0];

      const previousCubeSpot = pawn.parentElement;
      const colorPath = color + "Path";

      let colorPathNumber = Array.from(previousCubeSpot.classList).find((item) => {
        return item.includes(colorPath);
      });
      if (!colorPathNumber) return;

      colorPathNumber = Number(colorPathNumber.split(colorPath)[1]);
      await cubeSportMove(colorPathNumber, 1, colorPath, pawn, true);
      console.log(cubeSpot[0])
      cubeSpot[0].appendChild(pawn);
      pawnMoveSound()
    }
  }

  async function handleAutoPlay() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    handlePawnMove(autoPlay.name, autoPlay.colorId);
    dispatch({ type: reducerAction.autoPlay, payload: null });
  }

  function setRank(colorId, rank) {
    if (!rank) return;
    switch (colorId) {
      case 1:
        dispatch({ type: reducerAction.setRedRank, payload: rank })
        break;
      case 2:
        dispatch({ type: reducerAction.setGreenRank, payload: rank })
        break;
      case 3:
        dispatch({ type: reducerAction.setYellowRank, payload: rank })
        break;
      case 4:
        dispatch({ type: reducerAction.setBlueRank, payload: rank })
        break;
      default:
        break
    }
  }

  return (
    <div className='game-board-body'>
      <div className="game-board-container">
        <div className="game-board">
          <FirstHalf handlePawnMove={handlePawnMove} />
          <MidHalf />
          <LastHalf handlePawnMove={handlePawnMove} />
        </div>
      </div>

      <div className='flex justify-center items-center flex-col'>
        <PlayerDiceCard name={name} colorId={colorId} time={38}>
          <Dice handleDiceRoll={handleDiceRoll} />
        </PlayerDiceCard>
        {(roomData?.ownerId == playerId && roomData?.event === 'pending') && < PrimaryButton name="Start" handler={handleStartGame} />}
      </div>
    </div>
  )
}

export default Game