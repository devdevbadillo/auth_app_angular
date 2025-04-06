import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-social-media',
  template: `
    <button
      class="w-full flex items-center gap-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      type="button"
      (click)="handleClick()"
    >
      <div class="w-[44%] flex justify-end h-5">
        <img [src]="urlPhoto" [alt]="alt"/>
      </div>
      <span class="w-[44%] text-left">{{ text }}</span>
    </button>

  `,
})
export class AuthSocialMediaComponent{
  @Input() urlPhoto: string = '';
  @Input() text: string = '';
  @Input() alt: string = '';
  @Input() destination: string = '';

  handleClick(): void {
    window.location.href = this.destination;
  }

}
