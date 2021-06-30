import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppsHttpModule } from '@web-di-ld/apps/http';
import { AppRoutingModule } from './app-routing.module';
import { UiLoadingService } from './ui-loading/ui-loading.service';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoRootModule,
    BrowserAnimationsModule,
    AppsHttpModule.forEnvironment(environment),
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [UiLoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
