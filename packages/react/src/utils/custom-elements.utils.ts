import { useEffect } from 'react';

export function useElementPropBinding<T extends HTMLElement>(
  element: T | null | undefined,
  prop: keyof T,
  value: T[keyof T]
) {
  useEffect(() => {
    if (element) {
      element[prop] = value;
    }
  }, [element, prop, value]);
}

export function useElementEventNotifier<
  T extends HTMLElement,
  K extends keyof HTMLElementEventMap
>(
  element: T | null | undefined,
  event: K,
  callback?: (event: HTMLElementEventMap[K]) => void
) {
  useEffect(() => {
    if (!element) return;
    if (!callback) return;

    const el = element;
    el.addEventListener(event, callback);

    return () => {
      el.removeEventListener(event, callback);
    };
  }, [element, event, callback]);
}
