// Safe Telemetry Socket Client Wrapper for School Admin

export function createSocketConnection(url: string = "http://localhost:5000") {
  try {
    const { io } = require("socket.io-client");
    return io(url, { transports: ["websocket", "polling"] });
  } catch (e) {
    console.warn("[School Admin Socket Client] socket.io-client module unavailable. Operating in offline mock mode.");
    return {
      connected: false,
      emit: () => {},
      on: () => {},
      disconnect: () => {}
    };
  }
}
