import { HttpClient } from '@angular/common/http';
import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Observable,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';

interface InitState {
  httpUrl: string;
  methodName: 'get' | 'post';
}

@Directive({
  selector: '[acHttpImage]',
})
export class HttpImageDirective implements OnInit, OnDestroy {
  subscription = new Subscription();

  private action = new BehaviorSubject<InitState>({
    httpUrl: '',
    methodName: 'get',
  });

  httpUrl$ = this.action.pipe(this.select((state) => state.httpUrl));
  methodName$ = this.action.pipe(this.select((state) => state.methodName));

  image$ = combineLatest([this.httpUrl$, this.methodName$]).pipe(
    switchMap(([url, name]) => {
      if (name === 'get') {
        return this.http.get(url, { responseType: 'blob' });
      }
      return EMPTY;
    }),
    map((blob) => {
      const url = URL.createObjectURL(blob);
      return this.domSanitizer.bypassSecurityTrustUrl(url);
    })
    // switchMap((url) => this.createView$(url))
  );

  @Input() public set acHttpImageMethod(methodName: string) {
    if (methodName) {
      this.reduceState((state) => {
        state.methodName =
          methodName === 'get' || methodName === 'post' ? methodName : 'get';
        return state;
      });
    }
  }

  @Input() public set acHttpImageOf(url: string) {
    if (url) {
      this.reduceState((state) => {
        state.httpUrl = url;
        return state;
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  tearDown: any = () => {};

  constructor(
    readonly http: HttpClient,
    private domSanitizer: DomSanitizer,
    private vc: ViewContainerRef,
    readonly tpr: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.image$.subscribe((url) => {
        this.tearDown();
        const viewRef = this.vc.createEmbeddedView(this.tpr, {
          $implicit: url,
        });
        this.tearDown = () => viewRef.destroy();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private reduceState(reducer: (state: InitState) => InitState) {
    const state = this.action.getValue();
    this.action.next(reducer(state));
  }

  private select(selector: (state: InitState) => InitState[keyof InitState]) {
    return (source: Observable<InitState>) =>
      source.pipe(
        map((state) => selector(state), distinctUntilChanged()),
        shareReplay(1)
      );
  }
}
