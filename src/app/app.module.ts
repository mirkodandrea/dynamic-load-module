import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicModule } from 'ng-dynamic-component';
import { ComponentRegistry } from './component-registry.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicModule
  ],
  providers: [ComponentRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
