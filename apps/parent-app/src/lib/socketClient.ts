// Safe Telemetry Socket Client Wrapper for Parent App (No external npm dependency required)

export interface SafeSocket {
  connected: boolean;
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback?: (...args: any[]) => void) => void;
  disconnect: () => void;
}

export function createSocketConnection(url: string = "http://localhost:5000"): SafeSocket {
  const listeners: Record<string, Function[]> = {};

  return {
    connected: true,
    emit: (event: string, ...args: any[]) => {
      // Stub emit handler for live tracking telemetry
    },
    on: (event: string, callback: (...args: any[]) => void) => {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
    },
    off: (event: string, callback?: (...args: any[]) => void) => {
      if (!listeners[event]) return;
      if (callback) {
        listeners[event] = listeners[event].filter(cb => cb !== callback);
      } else {
        listeners[event] = [];
      }
    },
    disconnect: () => {
      // Disconnect cleanup
    }
  };
}
