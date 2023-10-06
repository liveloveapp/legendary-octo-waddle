export function defineElementOnce(
  elementSelector: string,
  elementCtor: typeof HTMLElement
) {
  if (!customElements.get(elementSelector)) {
    customElements.define(elementSelector, elementCtor);
  }
}
