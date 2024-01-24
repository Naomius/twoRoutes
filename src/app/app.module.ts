import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./shared/shared.module";
import {BaseModule} from "./base/base.module";
import {BaseComponent} from "./base/base.component";

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BaseModule,
        SharedModule,
        AppRoutingModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
