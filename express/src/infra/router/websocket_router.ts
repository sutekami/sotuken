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

  socket.on('host:result', async () => {
    const roomId = parseCookie(socket)['room_id']!;
    let value = await getRoomValue({ roomId });

    value = setValue(value, { inResult: true });
    setRoomValue({ roomId, value });

    emitAllUser({ roomId, socket, value });
  });

  socket.on('host:next_vote', async () => {
    const roomId = parseCookie(socket)['room_id']!;
    let value = await getRoomValue({ roomId });

    let currentIssueSectionId = value.currentIssueSectionId;
    const issueSection = await bundle.IssueSectionRepository.first({
      issueSectionId: { gt: currentIssueSectionId },
    });
    currentIssueSectionId = issueSection?.issueSectionId;

    value = setValue(value, {
      currentIssueSectionId,
      inResult: false,
      inVoting: !!currentIssueSectionId,
      voteStatus: {},
    });
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
}
