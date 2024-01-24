import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of, tap, withLatestFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileSharedService {

    private readonly filesInBase$!: Observable<number>;

    private totalFileSize$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private processCount: number = 0; //todo мысль была по поводу scan в методе updateTotalSize, чтобы избавиться от этого костыля.

    constructor() {
        this.filesInBase$ = this.totalFileSize$;
    }
    updateTotalSize(): void {
        of(null).pipe(
            withLatestFrom(this.totalFileSize$),
            tap(([_, currentSize]) => {
                console.log(`Оригинальный размер: ${currentSize}`);
            }),
            map(([_, currentSize]) => {
                if (this.processCount % 2 === 0) {
                    return currentSize;
                } else {
                    return currentSize * 1.5;
                }
            }),
            tap(updatedSize => {
                console.log(`Обработанный размер: ${updatedSize}`);
            })
        ).subscribe(updatedSize => {
            this.processCount++;
            this.totalFileSize$.next(updatedSize);
        });
    }
    saveFileSize(size: number): void {
       this.totalFileSize$.next(size);
    }

    clearFileSize(): void {
        this.totalFileSize$.next(0);
    }

    get FilesSize(): Observable<number> {
        return this.filesInBase$
    }

}

