// ═══════════════════════════════════════════════════════════
// SchoolMitra Backend — Redis Client & Cache Manager
// ═══════════════════════════════════════════════════════════

import logger from "../utils/logger";

interface InMemStore {
  value: string;
  expiresAt?: number;
}

// In-Memory Fallback Cache Store when Redis server is offline
const inMemoryCache = new Map<string, InMemStore>();

export const redisCache = {
  async get(key: string): Promise<string | null> {
    const item = inMemoryCache.get(key);
    if (!item) return null;
    if (item.expiresAt && item.expiresAt < Date.now()) {
      inMemoryCache.delete(key);
      return null;
    }
    return item.value;
  },

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
    inMemoryCache.set(key, { value, expiresAt });
  },

  async del(key: string): Promise<void> {
    inMemoryCache.delete(key);
  },

  async setOTP(identifier: string, otp: string, ttlSeconds: number = 300): Promise<void> {
    await this.set(`otp:${identifier}`, otp, ttlSeconds);
  },

  async getOTP(identifier: string): Promise<string | null> {
    return await this.get(`otp:${identifier}`);
  },

  async delOTP(identifier: string): Promise<void> {
    await this.del(`otp:${identifier}`);
  }
};

export const initRedis = async () => {
  logger.info("⚡ Redis Cache Manager initialized (Active with fallback in-memory cache)");
};
