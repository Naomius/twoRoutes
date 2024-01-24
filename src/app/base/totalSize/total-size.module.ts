import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalSizeRoutingModule } from './total-size-routing.module';
import {TotalSizeComponent} from "./total-size.component";


@NgModule({
    declarations: [
        TotalSizeComponent
    ],
    imports: [
        CommonModule,
        TotalSizeRoutingModule
    ],
    exports: [
        TotalSizeComponent
    ]
})
export class TotalSizeModule {

}
