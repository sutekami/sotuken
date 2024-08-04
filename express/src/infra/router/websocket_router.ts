import { Socket } from "socket.io";

export function webSocketRouter(socket: Socket) {
  socket.on('create_vote_room', (roomId) => {
    socket.join(roomId);
  })

  socket.on('join_vote_room', (roomId) => {
    socket.join(roomId)
  })

  socket.on('room_chat', (roomId, msg) => {
    socket.to(roomId).emit('receive_room_chat', msg);
  })

  socket.on('disconnect', () => {
  })
}
