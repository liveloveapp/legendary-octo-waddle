import {
  ToastManagerElement,
  defineToastManagerElement,
} from './toast-manager.element';
import {
  ToastMessageElement,
  ToastCloseEvent,
  DEFAULT_TOAST_DURATION,
  defineToastMessageElement,
} from './toast-message.element';

export function defineToastElements() {
  defineToastManagerElement();
  defineToastMessageElement();
}

export {
  ToastManagerElement,
  ToastMessageElement,
  ToastCloseEvent,
  DEFAULT_TOAST_DURATION,
};
