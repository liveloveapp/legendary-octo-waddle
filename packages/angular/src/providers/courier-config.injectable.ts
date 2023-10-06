import { InjectionToken } from '@angular/core';
import { CourierSdkConfig } from '@courier-next/web';

export const COURIER_CONFIG = new InjectionToken<CourierSdkConfig>(
  'COURIER_CONFIG'
);
