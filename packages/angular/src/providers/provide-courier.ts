import { CourierSdkConfig } from '@courier-next/web';
import { COURIER_CONFIG } from './courier-config.injectable';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export function provideCourier(config: CourierSdkConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: COURIER_CONFIG,
      useValue: config,
    },
  ]);
}
