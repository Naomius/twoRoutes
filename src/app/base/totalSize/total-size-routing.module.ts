import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TotalSizeComponent} from "./total-size.component";

const routes: Routes = [
    {
        path: 'totalSize',
        component: TotalSizeComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotalSizeRoutingModule { }
