import { useEffect } from 'react';

export function useStylesConnector(
  element: HTMLElement | null | undefined,
  style?: React.CSSProperties
) {
  useEffect(() => {
    if (!element) return;

    if (style !== undefined) {
      Object.keys(style).forEach((key) => {
        type StringObject = { [key: string]: string };
        (element.style as unknown as StringObject)[key] = (
          style as unknown as StringObject
        )[key];
      });
    }
  }, [element, style]);
}

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

export function useElementPropBindings<T extends HTMLElement>(
  element: T | null | undefined,
  properties: Partial<Record<keyof T, T[keyof T]>>
) {
  for (const key of Object.keys(properties) as (keyof T)[]) {
    const value = properties[key];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useElementPropBinding(element, key, value as unknown as T[keyof T]);
  }
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

export function useElementEventNotifiers<T extends HTMLElement>(
  element: T | null | undefined,
  events: Partial<{
    [K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void;
  }>
) {
  for (const key of Object.keys(events) as (keyof HTMLElementEventMap)[]) {
    const callback = events[key] as (
      event: HTMLElementEventMap[typeof key]
    ) => void;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useElementEventNotifier(element, key, callback);
  }
}

export function useCustomElementConnector<T extends HTMLElement>({
  element,
  style,
  properties,
  events,
}: {
  element: T | null | undefined;
  style?: React.CSSProperties;
  properties: Partial<Record<keyof T, T[keyof T]>>;
  events: Partial<{
    [K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void;
  }>;
}) {
  useStylesConnector(element, style);
  useElementPropBindings(element, properties);
  useElementEventNotifiers(element, events);
}
