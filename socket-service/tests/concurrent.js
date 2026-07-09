import { io } from "socket.io-client";



function initSocket(roomId, playerId, colorId, name) {
    const socket = io("http://localhost:8080", {
        query: {
            'player-id': playerId,
            'room-id': roomId,
            'color-id': colorId,
            'player-name': name
        },
        reconnectionDelayMax: 10000,
    });

    socket.on('connect', () => {
        console.log('socket connect: ', socket.id)
    })
    socket.on("on::error", (data) => {
        console.log("error: ", socket.id, data)
    })
    return socket;
}

function fun() {
    const roomId = "65fff262-6bce-4303-95e9-32966f5f32fc";
    const playerId = "abc";
    const colorId = 1;
    const name = "one";

    for (let i = 0; i < 500; i++) {
        initSocket(roomId, playerId, colorId, name);
    }


}

fun()



// import { io } from "socket.io-client";

// const roomId = "65fff262-6bce-4303-95e9-32966f5f32fc";
// const playerId = "abc";
// const colorId = 1;
// const name = "one";

// const sockets = [];

// for (let i = 0; i < 5; i++) {
//     const socket = io("http://localhost:8080", {
//         query: {
//             "player-id": playerId,
//             "room-id": roomId,
//             "color-id": colorId,
//             "player-name": name,
//         },
//     });

//     socket.on("connect", () => {
//         console.log(`Socket ${i} connected:`, socket.id);
//     });

//     socket.on("connect_error", (err) => {
//         console.log(`Socket ${i} error:`, err.message);
//     });

//     sockets.push(socket);
// }

