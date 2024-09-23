import { Socket, Server } from "socket.io";
import * as bundle from 'infra/router/bundle';
import { redis, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND } from "infra/redis";

async function getRoomValue({ roomId }: { roomId: string }): Promise<roomType> {
  return JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
}

async function setRoomValue({ roomId, value }: { roomId: string, value: roomType }) {
  await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
}

export function webSocketRouter(socket: Socket, io: Server) {
  socket.on('hostJoinVoteRoom', async (roomId: string, sessionId: string) => {
    const value: roomType = await getRoomValue({ roomId });
    if (!value.hostUser?.sessionId) {
      value.hostUser = { sessionId }
    }
    await setRoomValue({ roomId, value });
    socket.join(roomId);
  })

  socket.on('guestJoinVoteRoom', async (roomId: string, sessionId: string, guestUserName: string) => {
    const value: roomType = await getRoomValue({ roomId });
    const obj: { [sessionId: string]: { userName: string } } = {};
    obj[sessionId] = { userName: guestUserName };
    value.guestUsers = { ...value.guestUsers, ...obj }
    await setRoomValue({ roomId, value });
    socket.join(roomId);
    socket.emit('successedGuestJoinVoteRoom');
  });

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
    value.participantCount = (io.sockets.adapter.rooms.get(roomId)?.size || 1) - 1;
    value.participantVotedCount = 0;
    value.voteStatus = {};

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

  socket.on('vote', async (roomId, issueSectionalOptionId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    value.participantVotedCount = (value.participantVotedCount || 0) + 1;
    const issueSectionIds = value.issueSectionIds || [];
    const obj = (value.voteStatus || {});
    obj[issueSectionalOptionId] = (obj[issueSectionalOptionId] || 0) + 1;
    value.voteStatus = obj;

    // NOTE: 全員の投票が終わってなければ待ってもらうイベントを発火
    // TODO: ここに投票したIssueSectionalOptionの状況間管理を行いたい
    if (value.participantCount !== value.participantVotedCount) {
      await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
      socket.emit('waitVoteComplate');
      return;
    }

    // NOTE: 投票結果を渡す
    const params = {
      issueSectionId: value.currentIssueSectionId,
      voteStatus: value.voteStatus,
    };

    socket.emit('voteResult', params);
    socket.to(roomId).emit('voteResult', params);
  });

  socket.on('nextVote', async (roomId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    const issueSectionIds = value.issueSectionIds || [];

    // TODO: Redisに入れているRoomIdを削除
    // TODO: roomIdの解散
    // NOTE: 全ての問題が終われば終了の処理を実行
    if (issueSectionIds.length === 0) {
      value.inProgress = false;
      await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);

      socket.emit('voteFinished', value);
      socket.to(roomId).emit('voteFinished', value);
      return;
    }

    // NOTE: ここから全員が投票し終わった後の処理になる
    const issueSectionId = issueSectionIds.shift();
    let issueSection
    if (issueSectionId)
      issueSection = await bundle.IssueSeectionRepository.find(issueSectionId);
    value.issueSectionIds = issueSectionIds;
    value.currentIssueSectionId = issueSectionId;
    value.participantVotedCount = 0;
    value.voteStatus = {};
    await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
    socket.emit('sendIssueSection', issueSection);
    socket.to(roomId).emit('sendIssueSection', issueSection)
    return;
  })

  socket.on('reset', async (roomId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    value.inProgress = false;
    await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
    socket.emit('voteStarted', value);
    socket.to(roomId).emit('voteStarted', value);
  })

  socket.on('debug', async (roomId) => {
    const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
    console.log(value);
  });

  socket.on('disconnect', () => {
    console.log('user disconnect');
  })
}
