import { Component } from '@angular/core';
import { Violin } from './violin/violin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h2>Hi</h2>
    <app-violin />
    <h3>there</h3>`,
  imports: [Violin],
  styles: `
    app-violin {
      width: 600px;
      height: 600px;
    }
  `,
})
export class AppComponent {
  title = 'angular-three-shaders';
}
