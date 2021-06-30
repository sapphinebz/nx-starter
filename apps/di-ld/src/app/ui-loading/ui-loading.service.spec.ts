import { TestBed } from '@angular/core/testing';

import { UiLoadingService } from './ui-loading.service';

describe('UiLoadingService', () => {
  let service: UiLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
