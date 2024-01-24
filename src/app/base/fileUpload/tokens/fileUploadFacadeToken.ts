import {InjectionToken} from "@angular/core";
import {IFileUploadManager} from "../file-upload.component";

export const FileUploadFacadeToken = new InjectionToken<IFileUploadManager>('FileUploadFacadeToken')
