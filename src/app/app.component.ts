import {
  Component,
  ComponentFactoryResolver,
  Injectable
} from "@angular/core";
import { DynamicComponent } from 'ng-dynamic-component';
import { ModulesRegistry } from './dynamic-modules-registry';

@Injectable({
  providedIn: "root"
})
export class ComponentRegistry {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public async get<T>(name: string) {
    let moduleName = null;
    if(name.includes('#')){
      [moduleName, name] = name.split('#');
    }
    let factoryClasses;
    if (moduleName == null) {
      //@ts-ignore
      factoryClasses = Array.from(this.componentFactoryResolver.ngModule._r3Injector.injectorDefTypes)
        //@ts-ignore
        .map(i => i.ɵmod.declarations)
        //@ts-ignore
        .flat();
    } else {
      const module = await ModulesRegistry[moduleName]();
      factoryClasses = Array.from(module[moduleName].ɵmod.declarations)
        //@ts-ignore
      .flat();
    }
    const factoryClass = factoryClasses.find(m => m.key == name);

    if (factoryClass === null) {
      alert(`Component ${name} not found`);
      return;
    }
    return factoryClass;

  }
}

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
