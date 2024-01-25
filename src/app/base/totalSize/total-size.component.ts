import {Component, Inject, OnInit} from '@angular/core';
import {TotalSizeFacadeService} from "../../core/services/facadeManagers/total-size.facade.service";
import {TotalSizeFacadeToken} from "./tokens/totalSizeFacadeToken";
import {Observable} from "rxjs";

@Component({
    selector: 'app-total-size',
    templateUrl: './total-size.component.html',
    styleUrls: ['./total-size.component.scss'],
    providers: [
        TotalSizeFacadeService,
        {provide: TotalSizeFacadeToken, useExisting: TotalSizeFacadeService}
    ]
})
export class TotalSizeComponent implements OnInit{

    fileSize$!: Observable<number>;
    constructor(@Inject(TotalSizeFacadeToken) private totalSizeFacadeService: ITotalSIzeManager) {
    }

    ngOnInit(): void {
        this.fileSize$ = this.totalSizeFacadeService.FileSize;
        // this.initializeSideEffects();
    }

    clearFileSize(): void {
        this.totalSizeFacadeService.clearFileSize();
    }

    initializeSideEffects(): void {
        this.totalSizeFacadeService.FileSize.subscribe(console.log)
    }
}

export interface ITotalSIzeManager {
    FileSize: Observable<number>;
    clearFileSize(): void;
}
