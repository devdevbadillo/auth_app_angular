import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-button',
  template: `
  <button
    class="w-full rounded-md text-[white] bg-[#E46643] py-[10px] hover:cursor-pointer transition-colors hover:bg-[#F39765]"
    type={{typeButton}}>
      {{ text }}
  </button>
  `
})

export class SharedButtonComponent {
  @Input() text!: string
  @Input() typeButton: string = "submit";
}
