import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { defineToastElements } from '@courier-next/web';
import { defineProviderElement } from 'packages/web/src/elements/provider';

@Component({
  standalone: true,
  imports: [],
  selector: 'courier-root',
  template: `
    <h1>Web Example</h1>
    <div #target></div>
  `,
  styles: [''],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('target', { read: ElementRef })
  target!: ElementRef<HTMLDivElement>;

  tenantId = process.env['VITE_COURIER_TENANT_ID'] as string;
  userId = process.env['VITE_COURIER_USER_ID'] as string;
  clientKey = process.env['VITE_COURIER_CLIENT_KEY'] as string;

  constructor() {
    defineProviderElement();
    defineToastElements();
  }

  ngAfterViewInit(): void {
    this.target.nativeElement.innerHTML = `
        <courier-provider client-key="${this.clientKey}">
          <courier-toast-manager
            tenant-id="${this.tenantId}"
            user-id="${this.userId}">
          </courier-toast-manager>
        </courier-provider>
      `;
  }
}
