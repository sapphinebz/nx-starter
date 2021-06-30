import { Component } from '@angular/core';
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
  pokemon$ = this.stateService.pokemon$.pipe(
    map((response) => response.results)
  );
  constructor(private stateService: AppStateService) {}

  sendRequest() {
    this.stateService.nextPage();
  }
}
