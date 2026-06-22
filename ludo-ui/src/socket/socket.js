import { io } from "socket.io-client";

let socket = null;
export function initSocket(roomId, playerId, name) {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    query: {
      'player-id': playerId,
      'room-id': roomId,
      'player-name': name
    },
    reconnectionDelayMax: 10000,
  });

  socket.on('connect', () => {
    console.log('socket connect')
  })
  return socket;
}

export default socket;