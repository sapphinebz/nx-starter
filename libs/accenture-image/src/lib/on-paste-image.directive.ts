import { Directive, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[acOnPasteImage]',
  exportAs: 'acOnPasteImage',
})
export class OnPasteImageDirective {
  private fileListAction = new Subject<File[]>();
  @Output() acOnPasteImage = this.fileListAction.pipe(
    filter((fileList) => Boolean(fileList))
  );
  files: File[] = [];
  constructor() {}

  @HostListener('window:paste', ['$event']) onPaste(event: ClipboardEvent) {
    const files = event.clipboardData?.files;
    this.files = [];
    if (files) {
      for (let index = 0; index < files.length; index++) {
        this.files.push(files[index]);
      }
    }

    this.fileListAction.next(this.files);
  }
}
