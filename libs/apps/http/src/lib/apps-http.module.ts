import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [HttpService],
})
export class AppsHttpModule {}
