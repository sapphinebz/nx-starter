import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpImageDirective } from './http-image.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [HttpImageDirective],
  exports: [HttpImageDirective],
})
export class AccentureImageModule {}
