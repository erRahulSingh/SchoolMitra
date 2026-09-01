import dotenv from "dotenv";
dotenv.config();

/**
 * MapRouter utility for rotating API keys to maximize free tier usage across multiple accounts.
 */
class MapRouter {
  private keys: string[] = [];
  private currentIndex: number = 0;

  constructor() {
    // Collect all MAPBOX_API_KEY_x from environment variables
    for (let i = 1; i <= 5; i++) {
      const key = process.env[`MAPBOX_API_KEY_${i}`];
      if (key) {
        this.keys.push(key);
      }
    }

    if (this.keys.length === 0) {
      console.warn("⚠️ No Mapbox API keys found in .env! Ensure MAPBOX_API_KEY_1 is set.");
      // Fallback dummy token for development so UI doesn't crash
      this.keys.push("pk.eyJ1IjoiZHVtbXkiLCJhIjoiY2xwYTkxMjM0NTY3OCJ9.dummy_fallback_key");
    } else {
      console.log(`✅ MapRouter initialized with ${this.keys.length} API keys.`);
    }
  }

  /**
   * Retrieves the next available Mapbox API key in a Round-Robin fashion.
   * This distributes API requests evenly across all available accounts.
   */
  public getNextKey(): string {
    if (this.keys.length === 0) return "";
    
    const key = this.keys[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    
    return key;
  }
}

export const mapRouter = new MapRouter();
