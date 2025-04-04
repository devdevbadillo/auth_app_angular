import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';

import { SharedButtonComponent, FormFieldComponent } from './components';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    // Pages
    Error404PageComponent,

    // Components
    SharedButtonComponent,
    FormFieldComponent,
  ],
  exports: [
    // Pages
    Error404PageComponent,

    // Components
    SharedButtonComponent,
    FormFieldComponent,
  ],
})
export class SharedModule { }
