import dotenv from "dotenv";
dotenv.config();

/**
 * MapRouter utility for rotating API keys to maximize free tier usage across multiple accounts.
 * Round-Robin cycling: Key 1 -> Key 2 -> Key 3 -> Key 4 -> Key 5 -> Key 1...
 */
class MapRouter {
  private currentIndex: number = 0;

  constructor() {
    this.initKeys();
  }

  private getLoadedKeys(): string[] {
    try {
      dotenv.config({ override: true });
    } catch (e) {}
    const keys: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const val = process.env[`MAPBOX_API_KEY_${i}`];
      if (val && !val.includes("dummy_key") && val.trim().length > 10) {
        keys.push(val.trim());
      }
    }
    return keys;
  }

  public initKeys() {
    const validKeys = this.getLoadedKeys();
    if (validKeys.length > 0) {
      console.log(`✅ [MapRouter] Active Key Pool: ${validKeys.length} valid keys loaded for Round-Robin rotation.`);
    } else {
      console.log(`ℹ️ [MapRouter] No real Mapbox keys set yet in .env. Falling back to OpenStreetMap / CartoDB tiles.`);
    }
  }

  /**
   * Retrieves the next available Mapbox API key in a Round-Robin fashion (1 -> 2 -> 3 -> 4 -> 5 -> 1).
   */
  public getNextKey(): string {
    const validKeys = this.getLoadedKeys();
    if (validKeys.length === 0) {
      return "";
    }

    const key = validKeys[this.currentIndex % validKeys.length];
    const keyIndex = (this.currentIndex % validKeys.length) + 1;
    this.currentIndex = (this.currentIndex + 1) % validKeys.length;

    console.log(`🗺️ [MapRouter] Dispatched Key #${keyIndex}/${validKeys.length} to client`);
    return key;
  }

  public getActiveCount(): number {
    return this.getLoadedKeys().length;
  }
}

export const mapRouter = new MapRouter();

