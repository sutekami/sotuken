import { Issue } from '@prisma/client';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const redis = new Redis(6379, 'redis');
const store = new RedisStore({ client: redis });

const BASE_ROOM_ID_KEY = 'ROOM_ID_KEY_';
const REDIS_EXPIRE_SECOND = 3600;

type roomType = {
  roomId?: string; // uuidのroom識別子
  guestUsers?: { hash: string; guestName: string; isActive: boolean }[]; // sessionIdをKey、ゲスト名をValue
  hostUsers?: string[]; // hostとなるsessionIdの配列
  inVoting?: boolean; // 投票中かどうかのフラグ
  inResult?: boolean; // 結果表示中かどうかのフラグ
  voteStatus?: Record<number, string[]>; // 投票されたIssueSectionalOptionIdをKey、投票したところにユーザーのsessionIdを入れる
  timeSecLimit?: number; // 投票の制限時間
  issues?: Issue[]; // ホスト側で設定したい投票テーマが型となったArray
  currentIssueId?: number; // ホストが設定した投票テーマのprimary_key
  currentIssueSectionId?: number; // 現在の投票テーマの中のある問題のprimary_key
  roomPassword?: string; // ※未実装、もしかしたらあってもいいかも
};

type returnRoomType = {
  roomId?: string;
  guestUsers?: Array<{ guestName?: string }>;
  inVoting?: boolean;
  inResult?: boolean;
  voteStatus?: Array<Record<number, { guestName?: string }>>;
  timeSecLimit?: number;
  issues?: Issue[];
  currentIssueId?: number;
  currentIssueSectionId?: number;
  roomPassword?: string;
};

// HACK: セキュリティ観点からsessionIdを送るのはNGなので、後でhashに変換して送るものを作成する
type Users = {
  sessionId: string;
  hash: string;
}[];

const ErrorType = {
  RoomNotExists: { value: 'RoomNotExists', msg: 'ルームが存在しません' },
};

export { redis, store, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND, ErrorType };
