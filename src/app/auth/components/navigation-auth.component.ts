import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-navigatation',
  template: `
    <p class={{textAlign}}>
      {{ text }}
      <span class="hover:cursor-pointer text-[#E46643] ">
        <a [routerLink]="url"> {{ destination }} </a>
      </span>
    </p>
  `
})

export class NavigationAuthComponent {
  @Input() text!: string;

  @Input() url!: string;

  @Input() destination!: string;

  @Input() textAlign: string = 'text-center';
}
