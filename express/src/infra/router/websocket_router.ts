import { Socket, Server } from "socket.io";
import * as bundle from 'infra/router/bundle';
import { redis, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND } from "infra/redis";

export function webSocketRouter(socket: Socket, io: Server) {
  socket.on('joinVoteRoom', (roomId) => {
    socket.join(roomId)
  })

  socket.on('room_chat', (roomId, msg) => {
    socket.to(roomId).emit('receive_room_chat', msg);
    socket.emit('receive_room_chat', msg);
  })

  socket.on('startVote', async (roomId, issueId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    let issue;
    if (issueId) issue = await bundle.IssueRepository.find(parseInt(issueId));

    value.inProgress = true;
    value.issueId = parseInt(issueId);
    value.issueSectionIds = issue?.issueSections.map(v => v.issueSectionId);
    value.currentIssueSectionId = value.issueSectionIds?.shift();

    await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
    socket.emit('voteStarted', value);
    socket.to(roomId).emit('voteStarted', value);
  });

  socket.on('fetchIssueSection', async (roomId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    let issueSection;
    if (value.currentIssueSectionId) issueSection = await bundle.IssueSeectionRepository.find(value.currentIssueSectionId);
    socket.emit('sendIssueSection', issueSection);
    socket.to(roomId).emit('sendIssueSection', issueSection);
  });

  socket.on('vote', async (roomId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    const issueSectionIds = value.issueSectionIds || [];
    // TODO: Redisに入れているRoomIdを削除
    // TODO: roomIdの解散
    if (issueSectionIds.length === 0) {
      value.inProgress = false;
      await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);

      socket.emit('voteFinished', value);
      socket.to(roomId).emit('voteFinished', value);
      return;
    }

    const issueSectionId = issueSectionIds.shift();
    let issueSection
    if (issueSectionId)
      issueSection = await bundle.IssueSeectionRepository.find(issueSectionId);
    value.issueSectionIds = issueSectionIds;
    value.currentIssueSectionId = issueSectionId;
    await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
    socket.emit('sendIssueSection', issueSection);
    socket.to(roomId).emit('sendIssueSection', issueSection)
  });

  socket.on('reset', async (roomId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    value.inProgress = false;
    await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
    socket.emit('voteStarted', value);
    socket.to(roomId).emit('voteStarted', value);
  })

  socket.on('disconnect', () => {
    console.log('user disconnect');
  })
}
