import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import {
  extend,
  injectStore,
  injectBeforeRender,
  NgtArgs,
  type NgtRenderState,
} from 'angular-three';
import * as THREE from 'three';
import { SceneInputs } from './violin.component';
import fragmentShader from '../../shaders/strings.glsl';

extend(THREE);

@Component({
  standalone: true,
  template: `
    <ngt-mesh>
      <ngt-plane-geometry *args="[2, 2]" />
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
  sceneInputs = inject(SceneInputs);
  store = injectStore();
  viewport = this.store.select('viewport');
  violinWidth = this.viewport().width;
  violinHeight = this.viewport().height;
  fragmentShader = fragmentShader;

  onG = computed(() => (this.sceneInputs.activeString() === 'g' ? 1.0 : 0.0));
  onD = computed(() => (this.sceneInputs.activeString() === 'd' ? 1.0 : 0.0));
  onA = computed(() => (this.sceneInputs.activeString() === 'a' ? 1.0 : 0.0));
  onE = computed(() => (this.sceneInputs.activeString() === 'e' ? 1.0 : 0.0));

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
