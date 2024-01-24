import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import {NavigationHeaderModule} from "./navigation-header/navigation-header.module";


@NgModule({
  declarations: [],
    imports: [
        CommonModule,
        BaseRoutingModule,
        NavigationHeaderModule
    ],
    exports: [
        NavigationHeaderModule
    ]
})
export class BaseModule { }
