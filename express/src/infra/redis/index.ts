import RedisStore from 'connect-redis';
import Redis from "ioredis";

const redis = new Redis(6379, "redis");
const store = new RedisStore({ client: redis });

export { redis, store }
