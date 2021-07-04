import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpImageDirective } from './http-image.directive';
import { HttpClientModule } from '@angular/common/http';
import { OnPasteImageDirective } from './on-paste-image.directive';
import { FileToImageUrlPipe } from './file-to-image-url.pipe';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [HttpImageDirective, OnPasteImageDirective, FileToImageUrlPipe],
  exports: [HttpImageDirective, OnPasteImageDirective, FileToImageUrlPipe],
})
export class AccentureImageModule {}
