export const getColorFromColorId = (colorId) => {
    switch (colorId) {
        case 1:
            return 'red';
        case 2:
            return 'green';
        case 3:
            return 'yellow';
        case 4:
            return 'blue';
    }
}

export const colorIdMap = {
    red: {
        id: 1,
        color: "red",
    },
    green: {
        id: 2,
        color: "green",
    },
    yellow: {
        id: 3,
        color: "yellow",
    },
    blue: {
        id: 4,
        color: "blue",
    },
}

export const makePawnFloating = (color, pawns) => {
    if (pawns.noPawn) {
        //todo process next player
        return
    }
    for (const key of Object.keys(pawns)) {
        //todo skip finish pawn
        const pawnClassName = key + "-" + color;
        const pawn = document.getElementsByClassName(pawnClassName);
        if (pawn.length !== 1) continue;
        pawn[0].classList.add('floating');
    }
}