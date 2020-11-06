import {
  Component,
  ComponentFactoryResolver,
  Injectable
} from "@angular/core";
import { DynamicComponent } from 'ng-dynamic-component';
import { ComponentRegistry } from './component-registry.service';
import { ModulesRegistry } from './dynamic-modules-registry';


@Component({
  selector: "app-root",
  template: `
  <button (click)="load('LazyFeatureModule#LazyComponent')">LazyComponent</button>
  <button (click)="load('LazyFeatureModule#OtherLazyComponent')">OtherLazyComponent</button>
  <button (click)="load('OtherLazyFeatureModule#OtherLazyComponent')">OtherLazyComponent</button>
  <ndc-dynamic
  [ndcDynamicComponent]="component">
  </ndc-dynamic>
  `,
  styleUrls: []
})
export class AppComponent {
  component: DynamicComponent;

  constructor(
    private _registry: ComponentRegistry
  ) { }

  async load(componentName: string) {
    const component = await this._registry.get(
      componentName
    );
    console.log('component', component);
    this.component = component;    
  }
}
