import { CourierSdk, CourierSdkConfig } from '@courier-next/web';
import {
  createContext,
  useState,
  useEffect,
  ReactElement,
  useContext,
} from 'react';

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
  tenantId,
  userId,
}: CourierSdkConfig & { children?: ReactElement }) {
  const [sdk, setSdk] = useState<CourierSdk | null>(null);

  useEffect(() => {
    const newSdk = new CourierSdk({
      clientKey,
      tenantId,
      userId,
    });

    setSdk(newSdk);

    return () => newSdk.destroy();
  }, [clientKey, tenantId, userId]);

  if (!sdk) {
    return null;
  }

  return <context.Provider value={sdk}>{children}</context.Provider>;
}
