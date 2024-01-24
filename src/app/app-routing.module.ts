import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseComponent} from "./base/base.component";

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./base/fileUpload/file-upload.module').then(m => m.FileUploadModule)
            },
            {
                path: '',
                loadChildren: () => import('./base/totalSize/total-size.module').then(m => m.TotalSizeModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
