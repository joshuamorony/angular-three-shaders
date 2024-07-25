import { Component, signal } from '@angular/core';
import { Violin, ViolinActiveString } from './violin/violin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ` <h1>The world's coolest violin</h1>
    <div>
      <button (click)="activeString.set('g')">G</button>
      <button (click)="activeString.set('d')">D</button>
      <button (click)="activeString.set('a')">A</button>
      <button (click)="activeString.set('e')">E</button>
    </div>
    <app-violin [activeString]="activeString()" />`,
  imports: [Violin],
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    div {
      width: 600px;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-around;
    }

    app-violin {
      width: 600px;
      height: 600px;
    }
  `,
})
export class AppComponent {
  activeString = signal<ViolinActiveString>(null);
}
