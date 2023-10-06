import { CourierMessageEvent, CourierSdk } from '../../sdk';
import { coerceAttributeToInteger } from '../../utils';
import { defineElementOnce } from '../../utils/custom-elements.utils';
import { getCourierSdkFromProviderElement } from '../provider';
import { ToastMessageElement } from './toast-message.element';

export class ToastManagerElement extends HTMLElement {
  #sdk?: CourierSdk;
  #ToastMessageElementCtor: typeof ToastMessageElement;

  get toastDuration() {
    return coerceAttributeToInteger(this.getAttribute('toastDuration'));
  }

  set toastDuration(value: number | null) {
    if (value !== null) {
      this.setAttribute('toast-duration', `${value}`);
    } else {
      this.removeAttribute('toast-duration');
    }
  }

  get toastClassName() {
    return this.getAttribute('toast-class-name') ?? '';
  }

  set toastClassName(toastClassName: string) {
    this.setAttribute('toast-class-name', toastClassName);
  }

  constructor(
    sdk?: CourierSdk,
    toastMessageElement: typeof ToastMessageElement = ToastMessageElement
  ) {
    super();

    this.#sdk = sdk;
    this.#ToastMessageElementCtor = toastMessageElement;
  }

  connectedCallback() {
    if (!this.#sdk) this.#sdk = getCourierSdkFromProviderElement(this);

    this.#sdk.addEventListener('couriermessage', (event) => {
      this.show((event as CourierMessageEvent).detail.title);
    });
  }

  show(message: string) {
    const toast = new this.#ToastMessageElementCtor();

    toast.message = message;

    if (this.toastClassName) {
      toast.classList.add(this.toastClassName);
    }

    if (this.toastDuration !== null) {
      toast.duration = this.toastDuration;
    }

    this.appendChild(toast);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'courier-toast-manager': ToastManagerElement;
  }
}

export function defineToastManagerElement() {
  defineElementOnce('courier-toast-manager', ToastManagerElement);
}
