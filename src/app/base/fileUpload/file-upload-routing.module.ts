import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileUploadComponent} from "./file-upload.component";

const routes: Routes = [
    {
        path: 'upload',
        component: FileUploadComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }
