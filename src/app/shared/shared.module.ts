import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';

import { SharedButtonComponent, FormFieldComponent, LoaderComponent } from './components';
import { EmptyComponent } from './components/empty/empty.component';

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
    LoaderComponent,
    EmptyComponent,
  ],
  exports: [
    // Pages
    Error404PageComponent,

    // Components
    SharedButtonComponent,
    FormFieldComponent,
    LoaderComponent
  ],
})
export class SharedModule { }
