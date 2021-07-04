import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Pipe({
  name: 'fileToImageUrl',
  pure: true,
})
export class FileToImageUrlPipe implements PipeTransform {
  constructor(readonly cd: ChangeDetectorRef) {}
  transform(file: File) {
    return new Observable<SafeUrl | null>((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }
}
