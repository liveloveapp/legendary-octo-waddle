/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CourierProvider, ToastManager } from '@courier-next/react';

export default function NewSdkDemo() {
  return (
    <div>
      <h1>New SDK Demo</h1>
      <CourierProvider
        clientKey={import.meta.env.VITE_COURIER_CLIENT_KEY!}
        tenantId={import.meta.env.VITE_COURIER_TENANT_ID!}
        userId={import.meta.env.VITE_COURIER_USER_ID!}
      >
        <ToastManager />
      </CourierProvider>
    </div>
  );
}
