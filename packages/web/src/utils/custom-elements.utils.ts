export function defineElementOnce(
  elementSelector: string,
  elementCtor: typeof HTMLElement
) {
  if (!customElements.get(elementSelector)) {
    customElements.define(elementSelector, elementCtor);
  }
}

export interface OnConnected {
  connectedCallback(): void;
}

export interface OnDisconnected {
  disconnectedCallback(): void;
}

export interface OnAttributeChanged {
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void;
}
