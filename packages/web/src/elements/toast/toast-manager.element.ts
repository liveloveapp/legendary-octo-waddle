import { CourierSdk } from '../../api/sdk';
import {
  OnAttributeChanged,
  OnConnected,
  coerceAttributeToInteger,
  defineElementOnce,
  setAttributeValue,
} from '../../utils';
import { getCourierSdkFromProviderElement } from '../provider';
import { ToastMessageElement } from './toast-message.element';

export class ToastManagerElement
  extends HTMLElement
  implements OnAttributeChanged, OnConnected
{
  static get observedAttributes() {
    return ['user-id', 'tenant-id'];
  }

  #sdk?: CourierSdk;
  #abortController?: AbortController;

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

  get userId() {
    return this.getAttribute('user-id');
  }

  set userId(userId: string | null) {
    setAttributeValue(this, 'user-id', userId);
  }

  get tenantId() {
    return this.getAttribute('tenant-id');
  }

  set tenantId(tenantId: string | null) {
    setAttributeValue(this, 'tenant-id', tenantId);
  }

  constructor(sdk?: CourierSdk) {
    super();

    this.#sdk = sdk;
  }

  #connectToMessages() {
    /**
     * Presence of an AbortController here indicates we've got an established
     * connection. Go ahead and tear it down to prepare for the new connection.
     */
    if (this.#abortController) {
      this.#abortController.abort();
      this.#abortController = undefined;
    }

    if (!this.userId) {
      return;
    }

    this.#abortController = new AbortController();
    const sdk = this.#sdk ?? getCourierSdkFromProviderElement(this);

    sdk.listenToNotifications({
      tenantId: this.tenantId,
      userId: this.userId,
      onMessage: (message) => this.show(message.title),
      signal: this.#abortController.signal,
    });
  }

  attributeChangedCallback(): void {
    this.#connectToMessages();
  }

  connectedCallback() {
    this.#connectToMessages();
  }

  show(message: string) {
    const toast = new ToastMessageElement();

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
