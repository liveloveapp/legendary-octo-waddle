import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  inject,
  signal,
  effect,
} from '@angular/core';

import {
  DEFAULT_TOAST_DURATION,
  ToastCloseEvent,
  ToastManagerElement,
  defineToastElements,
} from '@courier-next/web';
import { Subscription, fromEvent } from 'rxjs';
import { CourierService } from '../providers/courier.service';

/**
 * Intentionally using a directive instead of a component here
 * because we are wrapping a custom element. This means we
 * don't need CSS or a template.
 **/
@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'cou-toast-manager',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ToastManagerComponent implements AfterViewInit, OnDestroy {
  #courier = inject(CourierService);
  #elementRef = inject(ElementRef);
  #duration = signal(DEFAULT_TOAST_DURATION);
  #toastClassName = signal('');
  #subscriptions = new Subscription();
  #toastManager: ToastManagerElement | undefined;

  @Input() set duration(duration: number) {
    this.#duration.set(duration);
  }

  @Input() set toastClassName(toastClassName: string) {
    this.#toastClassName.set(toastClassName);
  }

  @Output() toastClose = new EventEmitter<string>();

  constructor() {
    defineToastElements();

    effect(() => {
      if (this.#toastManager) {
        this.#toastManager.toastDuration = this.#duration();
      }
    });

    effect(() => {
      if (this.#toastManager) {
        this.#toastManager.toastClassName = this.#toastClassName();
      }
    });
  }

  ngAfterViewInit(): void {
    const toastManager = new ToastManagerElement(this.#courier.sdk);

    this.#elementRef.nativeElement.appendChild(toastManager);

    this.#subscriptions.add(
      fromEvent<ToastCloseEvent>(toastManager, 'toastclose').subscribe(
        (event) => this.toastClose.emit(event.detail)
      )
    );
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
