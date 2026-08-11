import { io, Socket } from 'socket.io-client';

export function createSocketConnection(url: string = 'http://localhost:5000'): Socket | any {
  try {
    return io(url, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });
  } catch (e) {
    console.warn('[Driver App Socket Client] Socket connection failed. Using mock telemetry mode.');
    return {
      connected: false,
      emit: () => {},
      on: () => {},
      disconnect: () => {},
    };
  }
}
