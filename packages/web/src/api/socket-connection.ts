export interface CourierSubscribePayload {
  action: 'subscribe';
  data: {
    // Tenant ID
    accountId?: string;
    // User ID
    channel: string;
    // Client Key
    clientKey: string;
    /**
     * UUID saved in local storage at path `clientSourceId/${clientKey}/${userId}`
     */
    clientSourceId: string;
    event: '*';
    version: 5;
  };
}

export interface CourierMessage {
  type: 'message';
  elemental: {
    content: string;
    type: 'text';
  }[];
  preview: string;
  title: string;
  data: object;
  created: string;
  messageId: string;
}

export function connectToCourierWebSocket({
  signal,
  WebSocketCtor,
  onMessage,
  config,
}: {
  signal?: AbortSignal;
  WebSocketCtor: typeof WebSocket;
  onMessage: (message: CourierMessage) => void;
  config: {
    tenantId?: string;
    clientKey: string;
    clientSourceId: string;
    userId: string;
  };
}): void {
  const { tenantId, clientKey, clientSourceId, userId } = config;
  const socket = new WebSocketCtor(
    `wss://1x60p1o3h8.execute-api.us-east-1.amazonaws.com/production/?clientKey=${clientKey}`
  );

  socket.addEventListener('open', () => {
    const payload: CourierSubscribePayload = {
      action: 'subscribe',
      data: {
        accountId: tenantId,
        channel: userId,
        clientKey,
        clientSourceId,
        event: '*',
        version: 5,
      },
    };

    socket.send(JSON.stringify(payload));
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    if (message.type === 'message') {
      onMessage(message);
    }
  });

  if (signal) {
    signal.addEventListener('abort', () => socket.close());
  }
}
