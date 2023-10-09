import { Injectable, inject } from '@angular/core';
import { COURIER_CONFIG } from './courier-config.injectable';
import { CourierSdk, CourierMessage } from '@courier-next/web';
import { Observable, Observer } from 'rxjs';

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

  listenForMessages(config: {
    userId: string;
    tenantId?: string | null;
  }): Observable<CourierMessage> {
    return new Observable((observer: Observer<CourierMessage>) => {
      const abortController = new AbortController();

      this.sdk.listenToNotifications({
        userId: config.userId,
        tenantId: config.tenantId,
        onMessage: (message) => observer.next(message),
        signal: abortController.signal,
      });

      return () => abortController.abort();
    });
  }
}
