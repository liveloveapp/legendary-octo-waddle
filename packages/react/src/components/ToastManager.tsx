import { useEffect, useRef, useState } from 'react';
import {
  ToastCloseEvent,
  ToastManagerElement,
  defineToastElements,
} from '@courier-next/web';
import { useCourier } from '../providers/CourierProvider';
import { useCustomElementConnector } from '../utils';

export function ToastManager({
  userId,
  tenantId,
  toastDuration,
  className,
  toastClassName,
  onToastClose,
  style,
}: {
  userId: string;
  tenantId?: string;
  toastDuration?: number;
  className?: string;
  toastClassName?: string;
  onToastClose?: (event: ToastCloseEvent) => void;
  style?: React.CSSProperties;
}) {
  const courier = useCourier();
  const div = useRef<HTMLDivElement | null>(null);
  const [toastManagerElement, setToastManagerElement] =
    useState<ToastManagerElement | null>(null);

  useEffect(() => defineToastElements(), []);

  useCustomElementConnector({
    element: toastManagerElement,
    style,
    properties: {
      userId,
      tenantId,
      toastDuration,
      className,
      toastClassName,
    },
    events: {
      toastclose: onToastClose,
    },
  });

  useEffect(() => {
    if (!div.current) return;
    div.current.childNodes.forEach((child) => child.remove());

    const toastManagerElement = new ToastManagerElement(courier);
    div.current.appendChild(toastManagerElement);

    setToastManagerElement(toastManagerElement);
  }, [courier]);

  return <div ref={div} />;
}
