import {ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { SceneGraph } from './scene-graph';

export type ViolinActiveString = 'g' | 'd' | 'a' | 'e' | null;

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
})
export class Violin {
  sceneGraph = SceneGraph;
  activeString = input<ViolinActiveString>(null);
}
