import { CourierMessage, connectToCourierWebSocket } from './socket-connection';

export interface CourierSdkConfig {
  clientKey: string;
}

export class CourierSdk {
  #clientKey: string;

  constructor(config: CourierSdkConfig) {
    this.#clientKey = config.clientKey;
  }

  listenToNotifications(config: {
    tenantId?: string | null;
    userId: string;
    onMessage: (message: CourierMessage) => void;
    signal?: AbortSignal;
  }): void {
    connectToCourierWebSocket({
      signal: config.signal,
      WebSocketCtor: WebSocket,
      onMessage: config.onMessage,
      config: {
        clientKey: this.#clientKey,
        tenantId: config.tenantId ?? undefined,
        clientSourceId: config.userId,
        userId: config.userId,
      },
    });
  }
}
