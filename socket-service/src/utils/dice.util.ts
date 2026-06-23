const redState = [
    "common-1",
    "common-2",
    "common-3",
    "common-4",
    "common-5",
    "common-6",
    "common-7",
    "common-8",
    "common-9",
    "common-10",
    "common-11",
    "common-12",
    "common-13",
    "common-14",
    "common-15",
    "common-16",
    "common-17",
    "common-18",
    "common-19",
    "common-20",
    "common-21",
    "common-22",
    "common-23",
    "common-24",
    "common-25",
    "common-26",
    "common-27",
    "common-28",
    "common-29",
    "common-30",
    "common-31",
    "common-32",
    "common-33",
    "common-34",
    "common-35",
    "common-36",
    "common-37",
    "common-38",
    "common-39",
    "common-40",
    "common-41",
    "common-42",
    "common-43",
    "common-44",
    "common-45",
    "common-46",
    "common-47",
    "common-48",
    "common-49",
    "common-50",
    "common-51",
    "home-1",
    "home-2",
    "home-3",
    "home-4",
    "home-5",
    "home-6"
]

const greenState = [
    "common-14",
    "common-15",
    "common-16",
    "common-17",
    "common-18",
    "common-19",
    "common-20",
    "common-21",
    "common-22",
    "common-23",
    "common-24",
    "common-25",
    "common-26",
    "common-27",
    "common-28",
    "common-29",
    "common-30",
    "common-31",
    "common-32",
    "common-33",
    "common-34",
    "common-35",
    "common-36",
    "common-37",
    "common-38",
    "common-39",
    "common-40",
    "common-41",
    "common-42",
    "common-43",
    "common-44",
    "common-45",
    "common-46",
    "common-47",
    "common-48",
    "common-49",
    "common-50",
    "common-51",
    "common-52",
    "common-1",
    "common-2",
    "common-3",
    "common-4",
    "common-5",
    "common-6",
    "common-7",
    "common-8",
    "common-9",
    "common-10",
    "common-11",
    "common-12",
    "home-1",
    "home-2",
    "home-3",
    "home-4",
    "home-5",
    "home-6"
]

const yellowState = [
    "common-27",
    "common-28",
    "common-29",
    "common-30",
    "common-31",
    "common-32",
    "common-33",
    "common-34",
    "common-35",
    "common-36",
    "common-37",
    "common-38",
    "common-39",
    "common-40",
    "common-41",
    "common-42",
    "common-43",
    "common-44",
    "common-45",
    "common-46",
    "common-47",
    "common-48",
    "common-49",
    "common-50",
    "common-51",
    "common-52",
    "common-1",
    "common-2",
    "common-3",
    "common-4",
    "common-5",
    "common-6",
    "common-7",
    "common-8",
    "common-9",
    "common-10",
    "common-11",
    "common-12",
    "common-13",
    "common-14",
    "common-15",
    "common-16",
    "common-17",
    "common-18",
    "common-19",
    "common-20",
    "common-21",
    "common-22",
    "common-23",
    "common-24",
    "common-25",
    "home-1",
    "home-2",
    "home-3",
    "home-4",
    "home-5",
    "home-6"
]

const blueState = [
    "common-40",
    "common-41",
    "common-42",
    "common-43",
    "common-44",
    "common-45",
    "common-46",
    "common-47",
    "common-48",
    "common-49",
    "common-50",
    "common-51",
    "common-52",
    "common-1",
    "common-2",
    "common-3",
    "common-4",
    "common-5",
    "common-6",
    "common-7",
    "common-8",
    "common-9",
    "common-10",
    "common-11",
    "common-12",
    "common-13",
    "common-14",
    "common-15",
    "common-16",
    "common-17",
    "common-18",
    "common-19",
    "common-20",
    "common-21",
    "common-22",
    "common-23",
    "common-24",
    "common-25",
    "common-26",
    "common-27",
    "common-28",
    "common-29",
    "common-30",
    "common-31",
    "common-32",
    "common-33",
    "common-34",
    "common-35",
    "common-36",
    "common-37",
    "common-38",
    "home-1",
    "home-2",
    "home-3",
    "home-4",
    "home-5",
    "home-6"
]

const finalState = "home-6";

const diceValue = [
    1, 6, 3, 6, 5, 6,
    1, 6, 3, 4, 6, 6,
    1, 2, 3, 4, 5, 6
]

const colorMap = {
    red: {
        id: 1,
        color: "red"
    },
    green: {
        id: 2,
        color: "green"
    },
    yellow: {
        id: 3,
        color: "yellow"
    },
    blue: {
        id: 4,
        color: "blue"
    },
}

export enum PlayerColorName {
    Red = "red",
    Green = "green",
    Yellow = "yellow",
    Blue = "blue",
}

export enum PlayerColorId {
    Red = 1,
    Green = 2,
    Yellow = 3,
    Blue = 4,
}

export const getRandomDiceNumber = () => {
    return diceValue[getRandomNumber(0, diceValue.length - 1)];
}

function getRandomNumber(startRange: number, endRange: number) {
    return Math.round((Math.random() * (endRange - startRange)) + startRange);
}

export const getShuffleDiceValue = (): number => {
    const invalidNumberOfConsecutiveSixes = 3;
    let shuffleValue = [...diceValue];
    shuffleValue.sort(() => Math.random() - 0.5);

    // while (hasConsecutiveNSix(shuffleValue, invalidNumberOfConsecutiveSixes)) {
    //     shuffleValue.sort(() => Math.random() - 0.5);
    // }
    return shuffleValue[0]!;
}

// function hasConsecutiveNSix(diceValues, invalidNumberOfConsecutiveSixes) {
//     let consecutiveSixes = 0;
//     for (const item of diceValues) {
//         if (item == 6) {
//             consecutiveSixes++;
//             if (consecutiveSixes == invalidNumberOfConsecutiveSixes) {
//                 return true;
//             }
//         } else {
//             consecutiveSixes = 0
//         }
//     }
//     return false;
// }


exports.getPossiblePawnMove = (playerType, playerPawn, diceRollValue ) => {
    let stateArr = null;

    if (playerType == gameUtils.key.room.player.type.one) {
        stateArr = playerOneState
    } else if (playerType == gameUtils.key.room.player.type.two) {
        stateArr = playerTwoState;
    } else {
        return { [gameUtils.key.pawn.noMoveKey]: gameUtils.key.pawn.noMoveValue };
    }

    let pawnItems = gameUtils.key.pawn.itemKey;
    let obj = {};
    for (let key of pawnItems) {
        if (playerPawn[key] == gameUtils.key.pawn.completed) {
            continue;
        }
        if (playerPawn[key] == gameUtils.key.pawn.home) {
            if (diceRollValue == 6) {
                obj[key] = stateArr[0];
            }
            continue;
        }

        let stateIndex = stateArr.findIndex((item) => item == playerPawn[key]);
        if (stateIndex == -1) {
            return { [gameUtils.key.pawn.noMoveKey]: gameUtils.key.pawn.noMoveValue };
        }

        stateIndex += diceRollValue;

        if (stateIndex < stateArr.length) {
            obj[key] = stateArr[stateIndex];
        }
    }

    if (Object.keys(obj).length === 0) {
        return { [gameUtils.key.pawn.noMoveKey]: gameUtils.key.pawn.noMoveValue };
    }

    return obj;
}