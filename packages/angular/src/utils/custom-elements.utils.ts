import {
  DestroyRef,
  effect,
  EventEmitter,
  inject,
  Signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, fromEvent, merge, switchMap, tap } from 'rxjs';

export function bindSignalsToProperties<T extends object>(
  element$: Signal<T | null>,
  properties: Partial<Record<keyof T, Signal<T[keyof T]>>>
) {
  effect(() => {
    const element = element$();

    if (element) {
      (Object.keys(properties) as (keyof T)[]).forEach((key) => {
        const signal = properties[key];

        if (signal) {
          element[key] = signal();
        }
      });
    }
  });
}
// TODO: Get types from HTMLElementEventMap
export function bindEventsToOutputs<T extends Event>(
  element$: Signal<HTMLElement | null>,
  eventToOutputDict: { [eventName: string]: EventEmitter<T> }
) {
  const events$ = toObservable(element$).pipe(
    switchMap((element) => {
      if (!element) return EMPTY;

      return merge(
        ...Object.keys(eventToOutputDict).map((eventName) =>
          fromEvent<T>(element, eventName).pipe(
            tap((event) => {
              const output = eventToOutputDict[eventName];

              if (output) {
                output.emit(event);
              }
            })
          )
        )
      );
    })
  );

  const subscription = events$.subscribe();

  inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
}
