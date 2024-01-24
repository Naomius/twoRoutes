import {Injectable} from '@angular/core';
import {
    BehaviorSubject,
    map,
    Observable,
    of, skip, startWith,
    Subject,
    take,
    tap,
    withLatestFrom
} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileSharedService{
    private readonly filesInBase$!: Observable<number>;

    private fileFromInput$: Subject<File> = new Subject<File>();
    private totalFileSize$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private processCount: number = 0;
    constructor() {
        this.filesInBase$ = this.totalFileSize$;
        this.setFileSize();
    }

    get FilesSize(): Observable<number> {
        return this.filesInBase$
    }
    updateTotalSize(): void {
        of(null).pipe(
            withLatestFrom(this.totalFileSize$),
            tap(([_, currentSize]) => {
                console.log(`Оригинальный размер: ${currentSize}`);
                this.processCount++;
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
            }),
        ).subscribe(updatedSize => {
            this.totalFileSize$.next(updatedSize);
        });
    }

    fileSelected(file: File): void {
        this.fileFromInput$.next(file);
    }

    clearFileSize(): void {
        this.fileFromInput$.next(null);
    }

    setFileSize(): void {
        this.fileFromInput$.pipe(
            tap(file => {
                this.totalFileSize$.next(file.size)
            }),
            take(1),
        ).subscribe()
    }

}

