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

  backUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png';
  frontUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png';
  imageUrl = this.frontUrl;
  constructor(private stateService: AppStateService) {}

  sendRequest() {
    this.stateService.nextPage();
  }

  switchImage() {
    this.imageUrl =
      this.imageUrl === this.frontUrl ? this.backUrl : this.frontUrl;
  }
}
