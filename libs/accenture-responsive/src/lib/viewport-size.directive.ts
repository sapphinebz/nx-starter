import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

type ViewportSelection = 'sm' | 'md' | 'lg' | 'xl';
type ViewportMatch = { [key in ViewportSelection]: string };

@Directive({
  selector: '[acViewportSize]',
})
export class ViewportSizeDirective implements OnInit, OnDestroy {
  subscription = new Subscription();

  viewportMatch: ViewportMatch = {
    sm: '(max-width: 575px)',
    md: '(min-width: 576px) and (max-width: 767px)',
    lg: '(min-width: 768px) and (max-width: 992px)',
    xl: '(min-width: 993px)',
  };

  private action = new BehaviorSubject<ViewportSelection | null>(null);

  isMatchViewPort$ = this.action.pipe(
    filter((viewSelect) => Boolean(viewSelect)),
    switchMap((viewSelect) => {
      const media = this.viewportMatch[viewSelect as ViewportSelection];
      return this.breakpointObserver.observe(media);
    })
  );

  @Input() set acViewportSize(viewportSize: string) {
    if (this.isViewPort(viewportSize)) {
      this.action.next(viewportSize);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  tearDown: any = () => {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tpr: TemplateRef<any>,
    private vc: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.isMatchViewPort$.subscribe((matcher) => {
        if (matcher.matches) {
          this.tearDown();
          const viewRef = this.vc.createEmbeddedView(this.tpr);
          this.tearDown = () => viewRef.destroy();
        } else {
          this.tearDown();
        }
      })
    );
  }

  private isViewPort(port: string): port is ViewportSelection {
    return Object.keys(this.viewportMatch).includes(port);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
