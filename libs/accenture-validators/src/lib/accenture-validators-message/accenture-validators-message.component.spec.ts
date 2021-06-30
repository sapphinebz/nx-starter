import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccentureValidatorsMessageComponent } from './accenture-validators-message.component';

describe('AccentureValidatorsMessageComponent', () => {
  let component: AccentureValidatorsMessageComponent;
  let fixture: ComponentFixture<AccentureValidatorsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccentureValidatorsMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccentureValidatorsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
