import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationHeaderComponent} from "./navigation-header.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
    declarations: [
        NavigationHeaderComponent
    ],
    exports: [
        NavigationHeaderComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class NavigationHeaderModule { }
