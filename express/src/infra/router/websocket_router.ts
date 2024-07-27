import { Socket } from "socket.io";

export function webSocketRouter(socket: Socket) {
  socket.on('create_vote_room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('test', 'create_vote_room');
  })

  socket.on('join_vote_room', (roomId) => {
    // TODO: 指定されたroomIdがあるかどうか調べる処理を書く
    // TODO: roomに何人入っているかどうかを検証したい、方法探る
    socket.join(roomId)
    socket.to(roomId).emit('test', 'join_vote_room');
    console.log(socket.in(roomId))
  })

  socket.on('disconnect', () => {
    console.log('disconnect');
  })
}
