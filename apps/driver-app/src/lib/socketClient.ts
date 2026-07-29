// Safe Telemetry Socket Client Wrapper for Driver App

export function createSocketConnection(url: string = "http://localhost:5000") {
  try {
    // Dynamic import to prevent bundler errors if socket.io-client is not yet installed
    const { io } = require("socket.io-client");
    return io(url, { transports: ["websocket", "polling"] });
  } catch (e) {
    console.warn("[Driver App Socket Client] socket.io-client module unavailable. Operating in offline mock mode.");
    return {
      connected: false,
      emit: () => {},
      on: () => {},
      disconnect: () => {}
    };
  }
}
