import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterLink
    ],
    exports: [
        RouterLink,
        MatButtonModule,
        MatDividerModule,
        MatIconModule
    ]
})
export class SharedModule { }
