import { Socket, Server } from 'socket.io';
import * as bundle from 'infra/router/bundle';
import { redis, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND, ErrorType } from 'infra/redis';
import { parse } from 'cookie';

async function getRoomValue({ roomId }: { roomId: string }): Promise<roomType> {
  return JSON.parse((await redis.get(BASE_ROOM_ID_KEY + roomId)) || '{}');
}

async function setRoomValue({ roomId, value }: { roomId: string; value: roomType }) {
  await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
}

function setValue(
  value: roomType,
  {
    roomId,
    guestUsers,
    hostUsers,
    inVoting,
    inResult,
    voteStatus,
    timeSecLimit,
    issues,
    currentIssueId,
    currentIssueSectionId,
    roomPassword,
  }: roomType,
): roomType {
  return {
    roomId: roomId ?? value.roomId,
    guestUsers: guestUsers ?? value.guestUsers,
    hostUsers: hostUsers ?? value.hostUsers,
    inVoting: inVoting ?? value.inVoting ?? false,
    inResult: inResult ?? value.inResult ?? false,
    voteStatus: voteStatus ?? value.voteStatus,
    timeSecLimit: timeSecLimit ?? value.timeSecLimit,
    issues: issues ?? value.issues,
    currentIssueId: currentIssueId ?? value.currentIssueId,
    currentIssueSectionId: currentIssueSectionId ?? value.currentIssueSectionId,
    roomPassword: roomPassword ?? value.roomPassword,
  };
}

async function emitAllUser({ socket, value, roomId }: { socket: Socket; value: roomType; roomId: string }) {
  if (!!value.currentIssueSectionId) {
    const issueSection = await bundle.IssueSectionRepository.find(value.currentIssueSectionId);
    socket.emit('host:receive_issue_section', issueSection);
    socket.emit('guest:receive_issue_section', issueSection);
    socket.to(roomId).emit('host:receive_issue_section', issueSection);
    socket.to(roomId).emit('guest:receive_issue_section', issueSection);
  }
  socket.emit('host:receive_value', value);
  socket.emit('guest:receive_value', value);
  socket.to(roomId).emit('host:receive_value', value);
  socket.to(roomId).emit('guest:receive_value', value);
}

function emitError(socket: Socket, type?: string, msg?: string) {
  switch (type) {
    case ErrorType.RoomNotExists.value:
      return socket.emit('error', 'ルームが存在しません');
    default:
      return socket.emit('error', msg ?? 'エラーが発生しました');
  }
}

const parseCookie = (socket: Socket) => {
  return parse(socket.handshake.headers.cookie || '');
};

export function webSocketRouter(socket: Socket, io: Server) {
  socket.on('host:connect', async (userId: string) => {
    const roomId = parseCookie(socket)['room_id']!;
    const sessionId = parseCookie(socket)['_session_id']!;
    socket.join(roomId);
    let value = await getRoomValue({ roomId });

    // NOTE: 初回時のみredisに情報をセットする
    if (!value.hostUsers?.includes(sessionId)) {
      const hostUsers = [...(value.hostUsers || []), sessionId];
      value = setValue(value, { hostUsers });
    }

    // NOTE: Issuesをfetch
    const issues = await bundle.IssueRepository.where({
      userId: parseInt(userId),
    });
    value = setValue(value, { issues });

    setRoomValue({ roomId, value });
    emitAllUser({ roomId, socket, value });
  });

  socket.on('guest:connect', async () => {
    const roomId = parseCookie(socket)['room_id']!;
    const sessionId = parseCookie(socket)['_session_id']!;
    socket.join(roomId);
    let value = await getRoomValue({ roomId });

    if (value.roomPassword) return socket.emit('guest:require_password');
    const guestUsers = value.guestUsers?.map(obj => {
      if (obj.hash === sessionId) return { hash: obj.hash, guestName: obj.guestName, isActive: true };
      return obj;
    });
    value = setValue(value, { guestUsers });
    setRoomValue({ roomId, value });

    emitAllUser({ roomId, socket, value });
  });

  socket.on('host:update_setting', async () => {});

  socket.on('host:start_vote', async (issueId: number) => {
    const roomId = parseCookie(socket)['room_id']!;
    let value = await getRoomValue({ roomId });
    const issue = await bundle.IssueRepository.find(issueId);

    const currentIssueId = issueId;
    const currentIssueSectionId = issue?.issueSections[0].issueSectionId;

    value = setValue(value, { currentIssueId, currentIssueSectionId, inVoting: true });
    setRoomValue({ roomId, value });

    emitAllUser({ roomId, socket, value });
  });

  socket.on('guest:vote', async (optionId: number) => {
    const roomId = parseCookie(socket)['room_id']!;
    const sessionId = parseCookie(socket)['_session_id']!;
    let value = await getRoomValue({ roomId });

    let voteStatus: Record<string, number> = { ...value.voteStatus };
    voteStatus[sessionId] = optionId;

    value = setValue(value, { voteStatus });
    setRoomValue({ roomId, value });

    emitAllUser({ roomId, socket, value });
  });

  socket.on('disconnect', async () => {
    console.log('user disconnection');
    const targetSessionId = parseCookie(socket)['_session_id']!;
    const roomId = parseCookie(socket)['room_id']!;

    let value = await getRoomValue({ roomId });
    const guestUsers = value.guestUsers?.map(obj => {
      if (obj.hash === targetSessionId) return { hash: obj.hash, guestName: obj.guestName, isActive: false };
      return obj;
    });
    value = setValue(value, { guestUsers });
    setRoomValue({ roomId, value });

    emitAllUser({ roomId, socket, value });
  });
  // socket.on('hostJoinVoteRoom', async (roomId: string, sessionId: string) => {
  //   const value: roomType = await getRoomValue({ roomId });
  //   if (!value.hostUser?.sessionId) {
  //     value.hostUser = { sessionId }
  //   }
  //   await setRoomValue({ roomId, value });
  //   socket.join(roomId);
  // })
  // socket.on('guestJoinVoteRoom', async (roomId: string, sessionId: string, guestUserName: string) => {
  //   const value: roomType = await getRoomValue({ roomId });
  //   const obj: { [sessionId: string]: { userName: string } } = {};
  //   obj[sessionId] = { userName: guestUserName };
  //   value.guestUsers = { ...value.guestUsers, ...obj }
  //   await setRoomValue({ roomId, value });
  //   socket.join(roomId);
  //   socket.emit('successedGuestJoinVoteRoom');
  // });
  // socket.on('startVote', async (roomId: string, issueId: string) => {
  //   const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
  //   let issue;
  //   if (issueId) issue = await bundle.IssueRepository.find(parseInt(issueId));
  //   value.inProgress = true;
  //   value.issueId = parseInt(issueId);
  //   value.issueSectionIds = issue?.issueSections.map(v => v.issueSectionId);
  //   value.currentIssueSectionId = value.issueSectionIds?.shift();
  //   value.participantCount = (io.sockets.adapter.rooms.get(roomId)?.size || 1) - 1;
  //   value.participantVotedCount = 0;
  //   value.voteStatus = {};
  //   await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
  //   socket.emit('voteStarted', value);
  //   socket.to(roomId).emit('voteStarted', value);
  // });
  // socket.on('fetchIssueSection', async (roomId: string) => {
  //   const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
  //   let issueSection;
  //   if (value.currentIssueSectionId) issueSection = await bundle.IssueSeectionRepository.find(value.currentIssueSectionId);
  //   socket.emit('sendIssueSection', issueSection);
  //   socket.to(roomId).emit('sendIssueSection', issueSection);
  // });
  // socket.on('vote', async (roomId: string, sessionId: string, issueSectionalOptionId: string) => {
  //   const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
  //   value.participantVotedCount = (value.participantVotedCount || 0) + 1;
  //   const obj = (value.voteStatus || {});
  //   obj[issueSectionalOptionId] = [ ...(obj[issueSectionalOptionId] || []), sessionId ];
  //   value.voteStatus = obj;
  //   const voteStatusParams: { [sessionId: string]: { guestUserName: string, optionId: number } } = {};
  //   // TODO: ここで、ユーザーnameごとに投票したデータを親に渡したい
  //   for (let [optionId, sessionIds] of Object.entries(value.voteStatus)) {
  //     sessionIds.forEach(id => {
  //       voteStatusParams[id] = {
  //         guestUserName: (value.guestUsers || {})[id]?.userName,
  //         optionId: parseInt(optionId),
  //       }
  //     });
  //   };
  //   socket.to(roomId).emit('voteStatus', voteStatusParams);
  //   // NOTE: 全員の投票が終わってなければ待ってもらうイベントを発火
  //   if (value.participantCount !== value.participantVotedCount) {
  //     await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
  //     socket.emit('waitVoteComplate');
  //     return;
  //   }
  //   // NOTE: 投票結果を渡す
  //   const params = {
  //     issueSectionId: value.currentIssueSectionId,
  //     voteStatus: value.voteStatus,
  //   };
  //   socket.emit('voteResult', params);
  //   socket.to(roomId).emit('voteResult', params);
  // });
  // socket.on('nextVote', async (roomId: string) => {
  //   const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
  //   const issueSectionIds = value.issueSectionIds || [];
  //   // TODO: Redisに入れているRoomIdを削除
  //   // TODO: roomIdの解散
  //   // NOTE: 全ての問題が終われば終了の処理を実行
  //   if (issueSectionIds.length === 0) {
  //     value.inProgress = false;
  //     await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
  //     socket.emit('voteFinished', value);
  //     socket.to(roomId).emit('voteFinished', value);
  //     return;
  //   }
  //   // NOTE: ここから全員が投票し終わった後の処理になる
  //   const issueSectionId = issueSectionIds.shift();
  //   let issueSection
  //   if (issueSectionId)
  //     issueSection = await bundle.IssueSeectionRepository.find(issueSectionId);
  //   value.issueSectionIds = issueSectionIds;
  //   value.currentIssueSectionId = issueSectionId;
  //   value.participantVotedCount = 0;
  //   value.voteStatus = {};
  //   await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
  //   socket.emit('sendIssueSection', issueSection);
  //   socket.to(roomId).emit('sendIssueSection', issueSection)
  //   return;
  // })
  // socket.on('reset', async (roomId: string) => {
  //   const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
  //   value.inProgress = false;
  //   await redis.set(BASE_ROOM_ID_KEY + roomId, JSON.stringify(value), 'EX', REDIS_EXPIRE_SECOND);
  //   socket.emit('voteStarted', value);
  //   socket.to(roomId).emit('voteStarted', value);
  // })
  // socket.on('debug', async (roomId: string) => {
  //   const value: roomType = JSON.parse(await redis.get(BASE_ROOM_ID_KEY + roomId) || '{}');
  //   console.log(value);
  // });
  // socket.on('disconnect', () => {
  //   console.log('user disconnect');
  // })
}
