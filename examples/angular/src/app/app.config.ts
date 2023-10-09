import { ApplicationConfig } from '@angular/core';
import { provideCourier } from '@courier-next/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideCourier({
      clientKey: process.env['VITE_COURIER_CLIENT_KEY'] as string,
    }),
  ],
};
