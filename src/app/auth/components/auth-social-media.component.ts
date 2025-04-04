import { Component, Input } from '@angular/core';

@Component({
  selector: 'auth-social-media',
  template: `
    <button
        class="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        type="button"
    >
      <img src="{{urlPhoto}}" alt="{{alt}}" class="w-5 h-5">
      <span>{{ text }}</span>
    </button>
  `,
})
export class AuthSocialMediaComponent {

  @Input() urlPhoto: string = '';

  @Input() text: string = '';

  @Input() alt: string = '';
}
