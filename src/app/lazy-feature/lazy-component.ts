import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-lazy",
  template: "<div style='background-color:red'> a lazy component </div>",
  styles: []
})
export class LazyComponent {
  public static key = "LazyComponent";
}
