import { CourierSdk } from '../../sdk';

export class ProviderElement extends HTMLElement {
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

  connectedCallback() {
    const clientKey = this.getAttribute('client-key');
    const tenantId = this.getAttribute('tenant-id');
    const userId = this.getAttribute('user-id');

    if (clientKey === null || tenantId === null || userId === null) {
      throw new Error(
        'Courier Provider element must be supplied with a client-key, tenant-id, and user-id'
      );
    }

    this.#sdk = new CourierSdk({
      clientKey,
      tenantId,
      userId,
    });
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
  customElements.define('courier-provider', ProviderElement);
}
