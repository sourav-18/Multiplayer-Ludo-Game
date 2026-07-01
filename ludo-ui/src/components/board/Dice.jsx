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
        // roll.play();
        //adding and removing rolling and click event
        // Ndice[playersMove - 1].classList.add('rolling');
        // Ndice[playersMove - 1].removeEventListener('click', clickRoll);
        //removing dice value
        // docume
        const dices = document.getElementsByClassName('dice');

        if (dices.length == 0) return;
        const dice = dices[0];
        dice.classList.add('rolling');
        await new Promise((resolve) => setTimeout(resolve, 300));
        dice.querySelector(`#D${playerPossiblePawnMoveData.diceRollValue}`).classList.add('visible-dice');

        if(playerPossiblePawnMoveData.possiblePawnMoves.noPawn){
            //todo process next player
            // return
        }
        // dice.classList.remove('rolling');
        // for (let j = 1; j < 7; j++) {
        //     if (dice.querySelector(`#D${j}`).classList.contains('visible-dice')) {
        //         dice.querySelector(`#D${j}`).classList.remove('visible-dice')
        //     }
        // }
        // switch (playersMove) {
        //     case 1:
        //         redsMoveToken.classList.remove('floating');
        //         break;
        //     case 2:
        //         greensMoveToken.classList.remove('floating');
        //         break;
        //     case 3:
        //         yellowsMoveToken.classList.remove('floating');
        //         break;
        //     case 4:
        //         bluesMoveToken.classList.remove('floating');
        //         break;
        // }



        // setTimeout(() => {
        //     const randomInt = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        //     diceOutcome = randomInt;
        //     /* console.log("RANDOM : DICE-VALUE :",randomInt); */
        //     switch (randomInt) {
        //         case 1:
        //             Ndice[playersMove - 1].querySelector('#D1').classList.add('visible-dice');
        //             break;
        //         case 2:
        //             Ndice[playersMove - 1].querySelector('#D2').classList.add('visible-dice');
        //             break;
        //         case 3:
        //             Ndice[playersMove - 1].querySelector('#D3').classList.add('visible-dice');
        //             break;
        //         case 4:
        //             Ndice[playersMove - 1].querySelector('#D4').classList.add('visible-dice');
        //             break;
        //         case 5:
        //             Ndice[playersMove - 1].querySelector('#D5').classList.add('visible-dice');
        //             break;
        //         case 6:
        //             Ndice[playersMove - 1].querySelector('#D6').classList.add('visible-dice');
        //             break;
        //     }

        //     Ndice[playersMove - 1].classList.remove('rolling');

        //     tokenFloat(playersMove);


        // }, 500);


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