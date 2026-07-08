import React, { useEffect } from 'react'
import { AllState } from '../../context/Context';
import reducerAction from '../../utils/reducerAction.util';
import { getColorFromColorId, makePawnFloating } from '../../utils/constant.util';
import diceRollAudio from "../../assets/sounds/dice-roll.mp3"
import UseSound from '../common/UseSound';
import { RoomEvent } from '../../utils/room.util';

function Dice({ handleDiceRoll }) {
    const diceRollSound = UseSound(diceRollAudio);

    const { state: { playerId, currentTurn, roomData }, dispatch } = AllState();

    async function clickRoll() {
        if (playerId !== currentTurn || roomData.event !== RoomEvent.turnChange) {
            alert("Invalid turn")
            return;
        }
        const dice = document.getElementById('big-dice');
        if (!dice) return;

        dice.classList.add('rolling');
        diceRollSound()
        await new Promise((resolve) => setTimeout(resolve, 300));

        const possiblePawnMoveData = await handleDiceRoll();
        console.log(possiblePawnMoveData)
        if (possiblePawnMoveData === null || possiblePawnMoveData?.playerId !== currentTurn) {
            alert("Invalid turn")
            return;
        }

        dispatch({ type: reducerAction.setPlayerPossiblePawnMoveData, payload: possiblePawnMoveData })

        if (Object.keys(possiblePawnMoveData.possiblePawnMoves).length === 1) {
            const pawnNumber = Object.keys(possiblePawnMoveData.possiblePawnMoves)[0];
            const color = getColorFromColorId(possiblePawnMoveData.colorId);
            dispatch({
                type: reducerAction.autoPlay, payload: {
                    isAutoPlay: true,
                    colorId:possiblePawnMoveData.colorId,
                    name: pawnNumber + "-" + color
                }
            });
        }


        dice.querySelectorAll('.visible-dice').forEach(element => {
            element.classList.remove('visible-dice');
        });
        dice.querySelector(`#D${possiblePawnMoveData.diceRollValue}`).classList.add('visible-dice');

        // const color = getColorFromColorId(possiblePawnMoveData.colorId);
        // makePawnFloating(color, possiblePawnMoveData.possiblePawnMoves);

    }
    async function clickRollV2() {
        diceRollSound()
        const dice = document.getElementById('big-dice');
        if (!dice) return;
        dice.classList.add('rolling');
        await new Promise((resolve) => setTimeout(resolve, 300));
        dice.classList.remove('rolling');

    }
    return (
        <div>
            {/* {(roomData?.event === RoomEvent.turnChange && currentTurn === playerId) && < p className='absolute left-96'>Roll the dice</p>} */}
            <div className="dice-place" onClick={clickRoll}>
                <div className={`dice p4-dice ${(playerId === currentTurn && roomData?.event === RoomEvent?.turnChange) ? 'cursor-pointer' : ''}`} id="big-dice">
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>

                    <div className="roll-value D1" id="D1">
                        <div className="dice-dots"></div>
                    </div>
                    <div className="roll-value D2" id="D2">
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                    </div>
                    <div className="roll-value D3" id="D3">
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>

                    </div>
                    <div className="roll-value D4" id="D4">
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                    </div>
                    <div className="roll-value D5" id="D5">
                        <div className="dice-grid-big five">
                            <span className="dice-dots"></span>
                            <span className="dice-dots"></span>
                            <span className="dice-dots center"></span>
                            <span className="dice-dots"></span>
                            <span className="dice-dots"></span>
                        </div>
                    </div>
                    <div className="roll-value D6" id="D6">
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                        <div className="dice-dots"></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dice