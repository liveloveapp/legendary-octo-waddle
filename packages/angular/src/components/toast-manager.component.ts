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
} from '@angular/core';
import {
  DEFAULT_TOAST_DURATION,
  ToastCloseEvent,
  ToastManagerElement,
  defineToastElements,
} from '@courier-next/web';
import { Subscription } from 'rxjs';
import { CourierService } from '../providers/courier.service';
import { bindEventsToOutputs, bindSignalsToProperties } from '../utils';

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
  #userId = signal<string | null>(null);
  #tenantId = signal<string | null>(null);
  #toastManager = signal<ToastManagerElement | null>(null);
  #subscriptions = new Subscription();

  @Input() set duration(duration: number) {
    this.#duration.set(duration);
  }

  @Input() set toastClassName(toastClassName: string) {
    this.#toastClassName.set(toastClassName);
  }

  @Input() set userId(userId: string | null) {
    this.#userId.set(userId);
  }

  @Input() set tenantId(tenantId: string | null) {
    this.#tenantId.set(tenantId);
  }

  @Output() toastClose = new EventEmitter<ToastCloseEvent>();

  constructor() {
    defineToastElements();

    bindSignalsToProperties(this.#toastManager, {
      toastDuration: this.#duration,
      toastClassName: this.#toastClassName,
      userId: this.#userId,
      tenantId: this.#tenantId,
    });

    bindEventsToOutputs(this.#toastManager, {
      toastclose: this.toastClose,
    });
  }

  ngAfterViewInit(): void {
    const toastManager = new ToastManagerElement(this.#courier.sdk);

    this.#elementRef.nativeElement.appendChild(toastManager);

    this.#toastManager.set(toastManager);
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
