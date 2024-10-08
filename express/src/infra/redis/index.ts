import { Issue, IssueSection } from '@prisma/client';
import RedisStore from 'connect-redis';
import Redis from "ioredis";

const redis = new Redis(6379, "redis");
const store = new RedisStore({ client: redis });

const BASE_ROOM_ID_KEY = 'ROOM_ID_KEY_';
const REDIS_EXPIRE_SECOND = 3600;

/**
 * redisに入れるObjectのtypeを記述
 * {
 *   roomId: {
 *      inProgress: Boolean,
 *      issueId?: Number,
 *      currentIssueSectionId?: Number,
 *      finalIssueSectionId?: Number
 *      //
 *      // これより下は一旦保留、気が向いたら実装
 *      //
 *      participantCookieIds: Array<String>,
 *      participantCount?: Number,
 *   }
 * }
 */

type roomType = {
  roomId?: string;
  guestUsers?: Record<string, string>[];
  // hostUsers: Record<string, string>[];
  // ゆくゆくはhostUsersにも名前が入るようにしたい
  hostUsers?: string[];
  inVoting?: boolean;
  inResult?: boolean;
  voteStatus?: Record<number, string[]>;
  timeSecLimit?: number;
  issues?: Issue[];
  currentIssueId?: number;
  currentIssueSectionId?: number;
  currentIssueSectionalOptionId?: number;
}

export { redis, store, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND }
