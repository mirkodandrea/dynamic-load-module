import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-other-lazy",
  template: "<div style='background-color:green'> other lazy component </div>",
  styles: []
})
export class OtherLazyComponent {
  public static key = "OtherLazyComponent";
}
