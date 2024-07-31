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
import { Violin } from './violin.component';
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
  violin = inject(Violin);
  store = injectStore();
  fragmentShader = fragmentShader;

  onG = computed(() => (this.violin.activeString() === 'g' ? 1.0 : 0.0));
  onD = computed(() => (this.violin.activeString() === 'd' ? 1.0 : 0.0));
  onA = computed(() => (this.violin.activeString() === 'a' ? 1.0 : 0.0));
  onE = computed(() => (this.violin.activeString() === 'e' ? 1.0 : 0.0));

  uniforms = {
    time: { value: 0 },
    rectSize: {
      value: new THREE.Vector2(
        this.store.snapshot.viewport.width,
        this.store.snapshot.viewport.height
      ),
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
