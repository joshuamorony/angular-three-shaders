import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { SceneGraph } from './scene-graph';

export type ViolinActiveString = 'g' | 'd' | 'a' | 'e' | null;

@Injectable()
export class SceneInputs {
  activeString = signal<ViolinActiveString>(null);
}

@Component({
  selector: 'app-violin',
  standalone: true,
  template: `
    <ngt-canvas
      [sceneGraph]="sceneGraph"
      [orthographic]="true"
      [camera]="{
        position: [0, 0, 1],
        left: 0,
        right: 1,
        top: 1,
        bottom: 0,
        near: 1,
        far: 1.1
      }"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      height: 100dvh;
    }
  `,
  imports: [NgtCanvas],
  providers: [SceneInputs],
})
export class Violin {
  sceneGraph = SceneGraph;
  activeString = input<ViolinActiveString>(null);

  sceneInputs = inject(SceneInputs);

  constructor() {
    effect(
      () => {
        this.sceneInputs.activeString.set(this.activeString());
      },
      { allowSignalWrites: true },
    );
  }
}
