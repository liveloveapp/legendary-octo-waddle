/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CourierProvider, ToastManager } from '@courier-next/react';
import styled from 'styled-components';

const StyledToastManager = styled(ToastManager)`
  courier-toast-message {
    background-color: blue;
  }
`;

export default function NewSdkDemo() {
  return (
    <div>
      <h1>New SDK Demo</h1>
      <CourierProvider clientKey={import.meta.env.VITE_COURIER_CLIENT_KEY!}>
        <StyledToastManager
          tenantId={import.meta.env.VITE_COURIER_TENANT_ID!}
          userId={import.meta.env.VITE_COURIER_USER_ID!}
        />
      </CourierProvider>
    </div>
  );
}
