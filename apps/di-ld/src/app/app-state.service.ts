import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UiLoadingService } from './ui-loading/ui-loading.service';

interface State {
  limit: number;
  offset: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private stateAction = new BehaviorSubject<State>({ limit: 10, offset: 0 });
  pokemon$ = this.stateAction.pipe(
    switchMap(({ limit, offset }) =>
      this.http
        .get<any>(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        )
        .pipe(this.uiLoading.onLoading())
    )
  );

  constructor(private http: HttpClient, private uiLoading: UiLoadingService) {}

  private reducerState(reducer: (state: State) => State) {
    const state = this.stateAction.getValue();
    this.stateAction.next(reducer(state));
  }

  nextPage() {
    this.reducerState((state) => {
      state.offset += state.limit;
      return state;
    });
  }
}
