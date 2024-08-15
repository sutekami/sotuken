import { Socket, Server } from "socket.io";
import * as bundle from 'infra/router/bundle';
import { redis, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND } from "infra/redis";

export function webSocketRouter(socket: Socket, io: Server) {
  socket.on('join_vote_room', (roomId) => {
    socket.join(roomId)
  })

  socket.on('room_chat', (roomId, msg) => {
    socket.to(roomId).emit('receive_room_chat', msg);
    socket.emit('receive_room_chat', msg);
  })

  socket.on('start_vote', async (roomId, issueId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    let issue;
    if (issueId) issue = await bundle.IssueRepository.find(parseInt(issueId));

    value.inProgress = true;
    value.issueId = parseInt(issueId);
    value.issueSectionIds = issue?.issueSections.map(v => v.issueSectionId);
    value.currentIssueSectionId = value.issueSectionIds?.at(0);

    await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
    socket.emit('receive_start_vote', value);
    socket.to(roomId).emit('receive_start_vote', value);
  });

  socket.on('fetch_issue_section', async (roomId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    let issueSection;
    if (value.currentIssueSectionId) issueSection = await bundle.IssueSeectionRepository.find(value.currentIssueSectionId);
    socket.emit('receive_issue_section', issueSection);
    socket.to(roomId).emit('receive_issue_section', issueSection);
  })

  socket.on('disconnect', () => {
    console.log('user disconnect');
  })
}
