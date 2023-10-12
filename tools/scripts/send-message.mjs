import 'dotenv/config';
import { CourierClient } from '@trycourier/courier';

const courier = CourierClient({
  authorizationToken: process.env.COURIER_API_KEY,
});

const [, , message] = process.argv;

async function main() {
  await courier.send({
    message: {
      to: {
        user_id: process.env.VITE_COURIER_USER_ID,
        tenant_id: process.env.VITE_COURIER_TENANT_ID,
      },
      content: {
        title: message ?? 'Hello World',
        body: '{{foo}}',
      },
      data: {
        foo: 'bar',
      },
      routing: {
        method: 'single',
        channels: ['inbox'],
      },
    },
  });
}

main();
