
import {
    ComponentFactoryResolver,
    Injectable
} from "@angular/core";
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