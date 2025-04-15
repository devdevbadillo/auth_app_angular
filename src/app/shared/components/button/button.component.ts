import { Component, Input } from '@angular/core';
import { LoaderService } from '../../service/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'shared-button',
  template: `
    <button
      [disabled]="isSending$ | async"
      [attr.type]="typeButton"
      [ngClass]="{
        'bg-[#E46643] hover:bg-[#F39765] hover:cursor-pointer': !(isSending$ | async),
        'bg-[#F39765] cursor-not-allowed': isSending$ | async
      }"
      class="w-full rounded-md text-[white] py-[10px] transition-colors"
    >
      {{ (isSending$ | async) ? 'Sending...' : text }}
    </button>
  `
})
export class SharedButtonComponent {
  @Input() text!: string;
  @Input() typeButton: string = 'submit';
  isSending$: Observable<boolean>;

  constructor(private readonly loaderService: LoaderService) {
    this.isSending$ = this.loaderService.isSending$;
  }
}
