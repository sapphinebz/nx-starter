import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'ac-accenture-validators-message',
  templateUrl: './accenture-validators-message.component.html',
  styleUrls: ['./accenture-validators-message.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccentureValidatorsMessageComponent
  implements OnInit, AfterContentInit {
  @ContentChild(NgControl) ngControl!: NgControl;

  get invalid() {
    return Boolean(this.ngControl?.control?.invalid);
  }

  get touched() {
    return Boolean(this.ngControl.control?.touched);
  }

  constructor() {}

  ngAfterContentInit(): void {
    console.log(this.ngControl);
  }

  ngOnInit(): void {}
}
