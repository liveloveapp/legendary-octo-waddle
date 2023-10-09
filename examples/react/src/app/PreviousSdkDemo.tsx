import { CourierProvider } from '@trycourier/react-provider';
import { Toast } from '@trycourier/react-toast';

export default function PreviousSdkDemo() {
  return (
    <div>
      <h2>Prevous SDK Demo</h2>
      <CourierProvider
        clientKey={import.meta.env.VITE_COURIER_CLIENT_KEY}
        tenantId={import.meta.env.VITE_COURIER_TENANT_ID}
        userId={import.meta.env.VITE_COURIER_USER_ID}
      >
        <Toast />
      </CourierProvider>
    </div>
  );
}
