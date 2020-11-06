import {
  Component,
  ComponentFactoryResolver,
  Injectable
} from "@angular/core";
import { DynamicComponent } from 'ng-dynamic-component';


@Injectable({
  providedIn: "root"
})
export class ComponentRegistry {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public get<T>(name: string, module = null) {
    let factoryClasses;
    if (module == null) {
      //@ts-ignore
      factoryClasses = Array.from(this.componentFactoryResolver.ngModule._r3Injector.injectorDefTypes)
        //@ts-ignore
        .map(i => i.ɵmod.declarations)
        //@ts-ignore
        .flat();
    } else {
      const moduleName = Object.keys(module).filter(k => k.endsWith('Module'))[0]
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
  <button (click)="load('LazyComponent')">LazyComponent</button>
  <button (click)="load('OtherLazyComponent')">OtherLazyComponent</button>
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
    const module = await import("./lazy-feature/lazy-feature.module");
    const component = this._registry.get(
      componentName,
      module
    );
    console.log('component', component);
    this.component = component;    
  }
}
