import { useEffect, useRef, useState } from 'react';
import {
  ToastManagerElement,
  ToastMessageElement,
  defineToastElements,
} from '@courier-next/web';
import { useCourier } from '../providers/CourierProvider';

export function ToastManager({
  toastDuration,
  style,
  className,
  toastClassName,
  toastMessageElement,
}: {
  toastDuration?: number;
  style?: React.CSSProperties;
  className?: string;
  toastClassName?: string;
  toastMessageElement?: typeof ToastMessageElement;
}) {
  const courier = useCourier();
  const div = useRef<HTMLDivElement | null>(null);
  const [toastManagerElement, setToastManagerElement] =
    useState<ToastManagerElement | null>(null);

  useEffect(() => {
    defineToastElements();
  }, []);

  useEffect(() => {
    if (!div.current) return;
    div.current.childNodes.forEach((child) => child.remove());

    const toastManagerElement = new ToastManagerElement(
      courier,
      toastMessageElement
    );
    div.current.appendChild(toastManagerElement);

    setToastManagerElement(toastManagerElement);
  }, [courier, toastMessageElement]);

  useEffect(() => {
    if (!toastManagerElement) return;

    if (toastDuration !== undefined)
      toastManagerElement.toastDuration = toastDuration;

    if (style !== undefined) {
      Object.keys(style).forEach((key) => {
        type StringObject = { [key: string]: string };
        (toastManagerElement.style as unknown as StringObject)[key] = (
          style as unknown as StringObject
        )[key];
      });
    }

    if (className !== undefined) toastManagerElement.className = className;
  }, [toastManagerElement, toastDuration, style, className, toastClassName]);

  return <div ref={div} />;
}
