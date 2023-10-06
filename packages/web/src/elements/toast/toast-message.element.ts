import { coerceAttributeToInteger } from '../../utils';
import { defineElementOnce } from '../../utils/custom-elements.utils';

export const DEFAULT_TOAST_DURATION = 5_000;

export class ToastCloseEvent extends CustomEvent<string> {
  constructor(message: string) {
    super('toastclose', {
      detail: message,
      bubbles: true,
    });
  }
}

export class ToastMessageElement extends HTMLElement {
  get duration() {
    return coerceAttributeToInteger(
      this.getAttribute('duration'),
      DEFAULT_TOAST_DURATION
    );
  }

  set duration(value: number) {
    this.setAttribute('duration', `${value}`);
  }

  get message() {
    return this.getAttribute('message') ?? '';
  }

  set message(message: string) {
    this.setAttribute('message', message);
    this.innerText = message;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    // Force reflow to enable transition from the start
    void this.offsetWidth;
    this.classList.add('active');
    setTimeout(() => this.close(), this.duration);
  }

  close() {
    this.classList.remove('active');
    // Listen for the transition to finish
    this.addEventListener(
      'transitionend',
      () => {
        this.remove();
        this.dispatchEvent(new ToastCloseEvent(this.message));
      },
      { once: true }
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'courier-toast-message': ToastMessageElement;
  }
}

export function defineToastMessageElement() {
  defineElementOnce('courier-toast-message', ToastMessageElement);
}
