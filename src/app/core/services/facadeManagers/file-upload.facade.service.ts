import {Injectable} from "@angular/core";
import {IFileUploadManager} from "../../../base/fileUpload/file-upload.component";
import {Subject, take, tap} from "rxjs";
import {FileSharedService} from "../fileService/file-shared.service";

@Injectable()
export class FileUploadFacadeService implements IFileUploadManager {

    private fileSelected$: Subject<File> = new Subject<File>();
    constructor(private fileService: FileSharedService) {
        this.fileSelected$.pipe(
            tap(file => {
                this.fileService.saveFileSize(file.size)
            }),
            take(1),
        ).subscribe()
    }

    fileSelected(file: File): void {
        this.fileSelected$.next(file);
    }

    updateTotalSize(): void {
        this.fileService.updateTotalSize()
    }

    clearFileSize(): void {
        this.fileService.clearFileSize();
    }
}
