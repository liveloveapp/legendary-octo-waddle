import { Component } from '@angular/core';
import { ToastManagerComponent } from '@courier-next/angular';

@Component({
  standalone: true,
  imports: [ToastManagerComponent],
  selector: 'courier-root',
  template: `
    <h1>Welcome examples-angular</h1>
    <cou-toast-manager></cou-toast-manager>
  `,
  styles: [''],
})
export class AppComponent {}
