import { Injectable } from '@angular/core';
import {ITotalSIzeManager} from "../../../base/totalSize/total-size.component";
import {FileSharedService} from "../fileService/file-shared.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TotalSizeFacadeService implements ITotalSIzeManager {

    private readonly fileSize$!: Observable<number>;
    constructor(private fileService: FileSharedService) {
        this.fileSize$ = this.fileService.FilesSize;
    }

    get FileSize(): Observable<number> {
        return this.fileSize$;
    }
    clearFileSize(): void {
        this.fileService.clearFileSize();
    }
}
