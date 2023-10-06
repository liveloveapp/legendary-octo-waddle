import {
  CourierMessage,
  connectToCourierWebSocket,
} from './api/socket-connection';

export interface CourierSdkConfig {
  tenantId: string;
  userId: string;
  clientKey: string;
}

export class CourierMessageEvent extends CustomEvent<CourierMessage> {
  constructor(message: CourierMessage) {
    super('couriermessage', {
      detail: message,
    });
  }
}

export class CourierSdk extends EventTarget {
  #destroyController = new AbortController();
  #tenantId: string;
  #userId: string;
  #clientKey: string;

  constructor(config: CourierSdkConfig) {
    super();

    this.#tenantId = config.tenantId;
    this.#userId = config.userId;
    this.#clientKey = config.clientKey;

    this.#connectToWebSocket((message) => {
      this.dispatchEvent(new CourierMessageEvent(message));
    }, this.#destroyController.signal);
  }

  #connectToWebSocket(
    onMessage: (message: CourierMessage) => void,
    signal?: AbortSignal
  ): void {
    connectToCourierWebSocket({
      signal,
      WebSocketCtor: WebSocket,
      onMessage,
      config: {
        tenantId: this.#tenantId,
        clientKey: this.#clientKey,
        clientSourceId: this.#userId,
        userId: this.#userId,
      },
    });
  }

  destroy() {
    this.#destroyController.abort();
  }
}
