import { CourierProvider } from '@trycourier/react-provider';
import { Toast } from '@trycourier/react-toast';

export default function PreviousSdkDemo() {
  return (
    <div>
      <h2>Prevous SDK Demo</h2>
      <CourierProvider
        tenantId={process.env.VITE_COURIER_TENANT_ID}
        userId={process.env.VITE_COURIER_USER_ID}
        clientKey={process.env.VITE_COURIER_CLIENT_KEY}
      >
        <Toast />
      </CourierProvider>
    </div>
  );
}
