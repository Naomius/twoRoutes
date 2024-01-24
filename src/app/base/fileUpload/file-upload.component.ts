import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileUploadFacadeToken} from "./tokens/fileUploadFacadeToken";
import {FileUploadFacadeService} from "../../core/services/facadeManagers/file-upload.facade.service";
import {BehaviorSubject, map, Subject, switchMap, takeUntil} from "rxjs";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    providers: [
        FileUploadFacadeService,
        {provide: FileUploadFacadeToken, useExisting: FileUploadFacadeService}
    ]
})
export class FileUploadComponent implements OnInit, OnDestroy{
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>

    public fileFromInput$: Subject<any> = new Subject<any>(); //todo как в такой ситуации быть, пробовал варианты с интерфейсом, который в самом низу компонента.
    public processingButton$: Subject<void> = new Subject<void>();
    public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(@Inject(FileUploadFacadeToken) private fileUploadFacadeService: IFileUploadManager) {
    }

    ngOnInit(): void {
        this.initializeSideEffects();
    }

    initializeSideEffects(): void {
        this.fileFromInput$.pipe(
            map((file) => file.target.files[0]),
            takeUntil(this.destroy$)
        ).subscribe(file => {
            this.isLoading$.next(true);
            this.fileUploadFacadeService.fileSelected(file);
        })

        this.processingButton$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(_ => {
            this.fileUploadFacadeService.updateTotalSize();
        })
    }
    clearFileSize(): void {
        this.isLoading$.next(false);
        this.fileInput.nativeElement.value = '';
        this.fileUploadFacadeService.clearFileSize();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}

export interface IFileUploadManager {
    fileSelected(file: File): void;
    updateTotalSize(): void;
    clearFileSize(): void;
}

interface EventInputChange extends Event{
    target: HTMLInputElement;
}

