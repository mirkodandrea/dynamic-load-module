import { CommonModule } from "@angular/common";
import {
  NgModule
} from "@angular/core";
import { LazyComponent } from "./lazy-component";
import { OtherLazyComponent } from "./other-lazy-component";

@NgModule({
  declarations: [LazyComponent, OtherLazyComponent],
  imports: [CommonModule]
})
export class LazyFeatureModule {
}
