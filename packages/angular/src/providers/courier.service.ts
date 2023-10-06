import { Injectable, inject } from '@angular/core';
import { COURIER_CONFIG } from './courier-config.injectable';
import {
  CourierSdk,
  CourierMessage,
  CourierMessageEvent,
} from '@courier-next/web';
import { Observable, fromEvent, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourierService {
  readonly sdk: CourierSdk;

  constructor() {
    const config = inject(COURIER_CONFIG, { optional: true });

    if (!config) {
      throw new Error(
        'Missing Courier Configuration. Did you call provideCourier(...) in the root of your application?'
      );
    }

    this.sdk = new CourierSdk(config);
  }

  listenForMessages(): Observable<CourierMessage> {
    return fromEvent<CourierMessageEvent>(this.sdk, 'couriermessage').pipe(
      map((event) => event.detail)
    );
  }
}
