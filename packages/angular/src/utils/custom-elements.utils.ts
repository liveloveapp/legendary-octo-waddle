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

export function bindEventsToOutputs(
  element$: Signal<HTMLElement | null>,
  eventToOutputDict: Partial<{
    [K in keyof HTMLElementEventMap]: EventEmitter<HTMLElementEventMap[K]>;
  }>
) {
  const events$ = toObservable(element$).pipe(
    switchMap((element) => {
      if (!element) return EMPTY;

      return merge(
        ...(
          Object.keys(eventToOutputDict) as (keyof HTMLElementEventMap)[]
        ).map((eventName) =>
          fromEvent(element, eventName).pipe(
            tap((event) => {
              const output = eventToOutputDict[eventName];

              if (output) {
                output.emit(event as never);
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

export function connectToCustomElement<T extends HTMLElement>({
  element,
  properties,
  events,
}: {
  element: Signal<T | null>;
  properties: Partial<Record<keyof T, Signal<T[keyof T]>>>;
  events: Partial<{
    [K in keyof HTMLElementEventMap]: EventEmitter<HTMLElementEventMap[K]>;
  }>;
}) {
  bindSignalsToProperties(element, properties);
  bindEventsToOutputs(element, events);
}
