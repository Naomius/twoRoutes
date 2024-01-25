import {Injectable} from '@angular/core';
import {
    filter,
    map, merge,
    Observable,
    scan, share, shareReplay,
    Subject,
    take, tap,
} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileSharedService{

    private readonly totalFileSize$: Observable<number>; //todo поместим в него merge size и file
    private processCount$: Observable<number>;

    private clearFileSize$: Subject<void> = new Subject<void>();
    private updateTotalSize$: Subject<void> = new Subject<void>();
    private fileFromInput$: Subject<File> = new Subject<File>();
    constructor() {
        this.processCount$ = this.updateTotalSize$.pipe(
            scan((prev, count) => {
                return prev + 1;
            }, 0)
        )

        this.totalFileSize$ = merge(
            this.clearFileSize$.pipe(
                map(() => ({action: 'clearSize', value: 0}))
            ),
            this.fileFromInput$.pipe(
                tap(console.log),
                map((file): { action: 'initial', value: number } => {
                    if (file) {
                        return {action: 'initial', value: file.size}
                    } else {
                        return null;
                    }
                }),
            ),
            this.processCount$.pipe(
                map((count): { action: 'update', value: number } => {
                    return {action: 'update', value: count}
                })
            )
        ).pipe(
            filter((value) => value !== null),
            scan(
                (acc, current) => {
                    if (current.action === 'initial') {
                        const originalSize = current.value;
                        const accumulatedSize = acc.size;

                        const increasedSize = acc.counter % 2 !== 0 ? originalSize * 1.5 : originalSize;
                        return { size: accumulatedSize + increasedSize, counter: acc.counter + 1 };

                    } else if (current.action === 'clearSize') {
                        return { size: 0, counter: 0 };
                    } else {
                        return acc;
                    }
                },
                { size: 0, counter: 0 }
            ),
            map((acc) => acc.size),
            share(),
            shareReplay({refCount: true, bufferSize: 1})
        );

        // this.totalFileSize$.subscribe(console.log)
    }

    get FilesSize(): Observable<number> {
        return this.totalFileSize$
    }
    updateTotalSize(): void {
        this.updateTotalSize$.next()
    }

    fileSelected(file: File): void {
        console.log(file)
        this.fileFromInput$.next(file);
    }

    clearFileSize(): void {
        this.clearFileSize$.next();
    }

    clearFileFromInput(): void {
        this.fileFromInput$.next(null);
    }

}

