import { CourierSdk, CourierSdkConfig } from '@courier-next/web';
import { createContext, ReactElement, useContext, useMemo } from 'react';

const context = createContext<CourierSdk | null>(null);

export function useCourier(): CourierSdk {
  const courier = useContext(context);

  if (courier === null) {
    throw new Error(
      'Courier has not been provided. Have you used <CourierProvider />?'
    );
  }

  return courier;
}

export function CourierProvider({
  children,
  clientKey,
}: CourierSdkConfig & { children?: ReactElement }) {
  const sdk = useMemo(() => new CourierSdk({ clientKey }), [clientKey]);

  return <context.Provider value={sdk}>{children}</context.Provider>;
}
