import 'dotenv/config';
import { CourierClient } from '@trycourier/courier';
//'pk_prod_67YGJZ75A7MW4EPDCBBCAP0KJMEG'
const courier = CourierClient({
  authorizationToken: process.env.COURIER_API_KEY,
});

async function main() {
  await courier.send({
    message: {
      to: {
        user_id: process.env.VITE_COURIER_USER_ID,
        tenant_id: process.env.VITE_COURIER_TENANT_ID,
      },
      content: {
        title: 'Hello World',
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
