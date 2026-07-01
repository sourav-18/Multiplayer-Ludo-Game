import React, { useEffect } from 'react'
import { AllState } from '../../context/Context';

function Dice() {
    const { state: { playerId, currentTurn, playerPossiblePawnMoveData }, dispatch } = AllState();

    async function clickRoll() {
        console.log(playerPossiblePawnMoveData)
        if (playerId !== currentTurn || playerPossiblePawnMoveData === null || playerPossiblePawnMoveData.playerId !== currentTurn) {
            alert("Invalid turn")
            return;
        }

        const dices = document.getElementsByClassName('dice');

        if (dices.length == 0) return;
        const dice = dices[0];
        dice.classList.add('rolling');
        await new Promise((resolve) => setTimeout(resolve, 300));
        dice.querySelector(`#D${playerPossiblePawnMoveData.diceRollValue}`).classList.add('visible-dice');

        if (playerPossiblePawnMoveData.possiblePawnMoves.noPawn) {
            //todo process next player
            return
        }

        for (const key of Object.keys(playerPossiblePawnMoveData.possiblePawnMoves)) {
            //todo skip finish pawn
            const pawnClassName = key + "-" + "red";
            const pawn = document.getElementsByClassName(pawnClassName);
            if (pawn.length !== 1) continue;
            console.log(pawnClassName)
            pawn[0].classList.add('floating');

        }

    }
    return (
        <div className="dice-place" onClick={clickRoll}>
            <div className={`dice p4-dice ${playerId === currentTurn ? 'cursor-pointer' : ''}`} id="p2-dice">
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
                    <table align="center" cellspacing="5px">
                        <tr>
                            <td className="d5td">
                                <div className="dice-dots"></div>
                            </td>
                            <td className="d5td">
                                <div className="dice-dots"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="d5td" colspan="2">
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
    )
}

export default Dice