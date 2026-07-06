import React, { useEffect } from 'react'
import { AllState } from '../../context/Context';
import reducerAction from '../../utils/reducerAction.util';
import { getColorFromColorId, makePawnFloating } from '../../utils/constant.util';
import { RoomEvent } from '../../utils/room.util';

function Dice({ handleDiceRoll }) {

    useEffect(() => {
        const dice = document.getElementById('big-dice');
        dice.querySelector(`#D5`).classList.add('visible-dice');
    }, [])

    const { state: { playerId, currentTurn, roomData }, dispatch } = AllState();

    async function clickRoll() {
        if (playerId !== currentTurn) {
            alert("Invalid turn")
            return;
        }

        const possiblePawnMoveData = await handleDiceRoll();
        if (possiblePawnMoveData === null || possiblePawnMoveData.playerId !== currentTurn) {
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
                    name: pawnNumber + "-" + color
                }
            });
        }

        const dice = document.getElementById('big-dice');


        if (!dice) return;
        dice.classList.add('rolling');
        await new Promise((resolve) => setTimeout(resolve, 300));
        dice.querySelectorAll('.visible-dice').forEach(element => {
            element.classList.remove('visible-dice');
        });
        dice.querySelector(`#D${possiblePawnMoveData.diceRollValue}`).classList.add('visible-dice');

        // const color = getColorFromColorId(possiblePawnMoveData.colorId);
        // makePawnFloating(color, possiblePawnMoveData.possiblePawnMoves);

    }
    async function clickRollV2() {
        const dice = document.getElementById('big-dice');


        if (!dice) return;
        dice.classList.add('rolling');
        await new Promise((resolve) => setTimeout(resolve, 300));
    }
    return (
        <div>
            {(roomData?.event === RoomEvent.turnChange && currentTurn === playerId) && < p className='absolute left-96'>Roll the dice</p>}
            <div className="dice-place" onClick={clickRoll}>
                <div className={`dice p4-dice ${playerId === currentTurn ? 'cursor-pointer' : ''}`} id="big-dice">
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