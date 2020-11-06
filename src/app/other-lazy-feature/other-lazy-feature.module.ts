import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-other-lazy",
  template: "<div style='background-color:yellow'> other lazy component </div>",
  styles: []
})
export class OtherLazyComponent {
  public static key = "OtherLazyComponent";
}


@NgModule({
  declarations: [OtherLazyComponent],
  imports: [
    CommonModule
  ]
})
export class OtherLazyFeatureModule { }
