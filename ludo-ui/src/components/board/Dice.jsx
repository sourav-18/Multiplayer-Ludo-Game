import React, { useEffect } from 'react'
import { AllState } from '../../context/Context';
import reducerAction from '../../utils/reducerAction.util';
import { getColorFromColorId, makePawnFloating } from '../../utils/constant.util';
import { RoomEvent } from '../../utils/room.util';

function Dice({ handleDiceRoll }) {

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

        const dice = document.getElementById('big-dice');


        if (!dice) return;
        dice.classList.add('rolling');
        await new Promise((resolve) => setTimeout(resolve, 300));
        dice.querySelectorAll('.visible-dice').forEach(element => {
            element.classList.remove('visible-dice');
        });
        dice.querySelector(`#D${possiblePawnMoveData.diceRollValue}`).classList.add('visible-dice');

        const color = getColorFromColorId(possiblePawnMoveData.colorId);
        makePawnFloating(color, possiblePawnMoveData.possiblePawnMoves);

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
                        <table align="center" cellSpacing="5px">
                            <tr>
                                <td className="d5td">
                                    <div className="dice-dots"></div>
                                </td>
                                <td className="d5td">
                                    <div className="dice-dots"></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="d5td" colSpan="2">
                                    <div className="dice-dots"></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="d5td">
                                    <div className="dice-dots"></div>
                                </td>
                                <td className="d5td">
                                    <div className="dice-dots"></div>
                                </td>
                            </tr>
                        </table>


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