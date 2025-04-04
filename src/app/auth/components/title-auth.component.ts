import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-title',
  template: `
    <h1 class="font-bold text-2xl">{{title}}</h1>
  `,
})
export class TitleComponent {
  @Input()
  title!: string;
}
