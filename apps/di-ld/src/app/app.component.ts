import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { map } from 'rxjs/operators';
import { AppStateService } from './app-state.service';

@Component({
  selector: 'web-di-ld-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: 'todos', alias: 'customName' },
    },
  ],
})
export class AppComponent {
  nameInputForm = new FormControl(null, Validators.required);
  passwordInputForm = new FormControl(null, Validators.required);
  emailInputForm = new FormControl(null, Validators.email);
  qualityInputForm = new FormControl(null, Validators.required);
  pokemon$ = this.stateService.pokemon$.pipe(
    map((response) => response.results)
  );
  constructor(private stateService: AppStateService) {}

  sendRequest() {
    this.stateService.nextPage();
  }
}
