import { Component } from '@angular/core';
import { ToastManagerComponent } from '@courier-next/angular';

@Component({
  standalone: true,
  imports: [ToastManagerComponent],
  selector: 'courier-root',
  template: `
    <h1>Welcome examples-angular</h1>
    <cou-toast-manager
      [tenantId]="tenantId"
      [userId]="userId"
    ></cou-toast-manager>
  `,
  styles: [''],
})
export class AppComponent {
  tenantId = process.env['VITE_COURIER_TENANT_ID'] as string;
  userId = process.env['VITE_COURIER_USER_ID'] as string;
}
