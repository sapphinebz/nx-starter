import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { defer, from, Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { UiLoadingComponent } from './ui-loading.component';

@Injectable()
export class UiLoadingService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  tearDown = () => {};
  constructor(
    private application: ApplicationRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  loading() {
    const factory = this.resolver.resolveComponentFactory(UiLoadingComponent);
    const componentRef = factory.create(this.injector);
    // const componentRef = this.vc.createComponent(factory);
    this.application.attachView(componentRef.hostView);
    this.document.body.appendChild(componentRef.location.nativeElement);

    this.tearDown = () => {
      this.document.body.removeChild(componentRef.location.nativeElement);
      this.application.detachView(componentRef.hostView);
    };
  }

  unloading() {
    this.tearDown();
  }

  onLoading<T>() {
    return (source: Observable<T>) =>
      defer(() => {
        this.loading();
        return source.pipe(
          delay(500),
          finalize(() => this.unloading())
        );
      });
  }
}
