import {Injectable} from "@angular/core";
import {IFileUploadManager} from "../../../base/fileUpload/file-upload.component";
import {FileSharedService} from "../fileService/file-shared.service";

@Injectable()
export class FileUploadFacadeService implements IFileUploadManager {
    constructor(private fileService: FileSharedService) {
    }

    fileSelected(file: File): void {
        this.fileService.fileSelected(file)
    }

    updateTotalSize(): void {
        this.fileService.updateTotalSize()
    }

    clearFileSize(): void {
        this.fileService.clearFileFromInput();
    }
}
