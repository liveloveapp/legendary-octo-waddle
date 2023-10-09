import { CourierSdk } from '../../api/sdk';
import {
  OnAttributeChanged,
  OnConnected,
  defineElementOnce,
} from '../../utils';

export class ProviderElement
  extends HTMLElement
  implements OnConnected, OnAttributeChanged
{
  static get observedAttributes() {
    return ['client-key'];
  }

  #sdk: CourierSdk | undefined;

  get sdk() {
    if (!this.#sdk) {
      throw new Error('Courier Provider element has not been initialized');
    }

    return this.#sdk;
  }

  constructor() {
    super();
  }

  #createSdk() {
    const clientKey = this.getAttribute('client-key');

    if (!clientKey) {
      this.#sdk = undefined;
    } else {
      this.#sdk = new CourierSdk({
        clientKey,
      });
    }
  }

  attributeChangedCallback(): void {
    this.#createSdk();
  }

  connectedCallback(): void {
    this.#createSdk();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'courier-provider': ProviderElement;
  }
}

export function getCourierSdkFromProviderElement(element: Node): CourierSdk {
  if (element instanceof ProviderElement) {
    return element.sdk;
  }

  const parent = element.parentNode;

  if (parent === null) {
    throw new Error('Could not find <courier-provider /> element.');
  }

  return getCourierSdkFromProviderElement(parent);
}

export function defineProviderElement() {
  defineElementOnce('courier-provider', ProviderElement);
}
