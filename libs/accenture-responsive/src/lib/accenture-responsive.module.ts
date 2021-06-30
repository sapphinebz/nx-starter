import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportSizeDirective } from './viewport-size.directive';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
  imports: [CommonModule, LayoutModule],
  declarations: [ViewportSizeDirective],
  exports: [ViewportSizeDirective],
})
export class AccentureResponsiveModule {}
