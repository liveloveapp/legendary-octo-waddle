import { ApplicationConfig } from '@angular/core';
import { provideCourier } from '@courier-next/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCourier({
      tenantId: process.env['VITE_COURIER_TENANT_ID'] as string,
      userId: process.env['VITE_COURIER_USER_ID'] as string,
      clientKey: process.env['VITE_COURIER_CLIENT_KEY'] as string,
    }),
  ],
};
