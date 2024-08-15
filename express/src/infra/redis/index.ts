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
  inProgress: boolean,
  issueId?: number,
  issueSectionIds?: Array<number>,
  currentIssueSectionId?: number,
  participantCount?: number,
  participantVotedCount?: number,
}

export { redis, store, roomType, BASE_ROOM_ID_KEY, REDIS_EXPIRE_SECOND }
