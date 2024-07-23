import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
} from '@angular/core';
import {
  extend,
  injectStore,
  injectBeforeRender,
  NgtArgs,
  type NgtRenderState,
} from 'angular-three';
import * as THREE from 'three';
import fragmentShader from '../../shaders/strings.glsl';

extend(THREE);

@Component({
  standalone: true,
  template: `
    <ngt-mesh [position]="[0, 0, 0]">
      <ngt-plane-geometry *args="[violinWidth, violinHeight]" />
      <ngt-shader-material [parameters]="{ uniforms, fragmentShader }">
        <ngt-value [rawValue]="onG()" attach="uniforms.onG.value" />
        <ngt-value [rawValue]="onD()" attach="uniforms.onD.value" />
        <ngt-value [rawValue]="onA()" attach="uniforms.onA.value" />
        <ngt-value [rawValue]="onE()" attach="uniforms.onE.value" />
      </ngt-shader-material>
    </ngt-mesh>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgtArgs],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
  store = injectStore();
  viewport = this.store.select('viewport');
  worldPosition = signal({ x: 0, y: 0 });
  violinWidth = this.viewport().width * 2;
  violinHeight = this.viewport().height * 2;

  onG = signal(0.0);
  onD = signal(0.0);
  onA = signal(1.0);
  onE = signal(0.0);

  fragmentShader = fragmentShader;

  uniforms = {
    time: { value: 0 },
    rectSize: {
      value: new THREE.Vector2(this.violinWidth, this.violinHeight),
    },
    onG: { value: this.onG() },
    onD: { value: this.onD() },
    onA: { value: this.onA() },
    onE: { value: this.onE() },
  };

  constructor() {
    injectBeforeRender(this.onBeforeRender.bind(this));
  }

  onBeforeRender({ clock }: NgtRenderState) {
    this.uniforms.time.value = clock.getElapsedTime();
  }
}
