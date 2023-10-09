import { useEffect, useRef, useState } from 'react';
import {
  ToastCloseEvent,
  ToastManagerElement,
  ToastMessageElement,
  defineToastElements,
} from '@courier-next/web';
import { useCourier } from '../providers/CourierProvider';
import { useElementEventNotifier, useElementPropBinding } from '../utils';

export function ToastManager({
  userId,
  tenantId,
  toastDuration,
  className,
  toastClassName,
  onToastClose,
  style,
  toastMessageElement,
}: {
  userId: string;
  tenantId?: string;
  toastDuration?: number;
  className?: string;
  toastClassName?: string;
  onToastClose?: (event: ToastCloseEvent) => void;
  style?: React.CSSProperties;
  toastMessageElement?: typeof ToastMessageElement;
}) {
  const courier = useCourier();
  const div = useRef<HTMLDivElement | null>(null);
  const [toastManagerElement, setToastManagerElement] =
    useState<ToastManagerElement | null>(null);

  useEffect(() => defineToastElements(), []);

  useElementPropBinding(toastManagerElement, 'userId', userId);
  useElementPropBinding(toastManagerElement, 'tenantId', tenantId);
  useElementPropBinding(toastManagerElement, 'toastDuration', toastDuration);
  useElementPropBinding(toastManagerElement, 'className', className);
  useElementPropBinding(toastManagerElement, 'toastClassName', toastClassName);
  useElementEventNotifier(toastManagerElement, 'toastclose', onToastClose);

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

    if (style !== undefined) {
      Object.keys(style).forEach((key) => {
        type StringObject = { [key: string]: string };
        (toastManagerElement.style as unknown as StringObject)[key] = (
          style as unknown as StringObject
        )[key];
      });
    }
  }, [toastManagerElement, style]);

  return <div ref={div} />;
}
