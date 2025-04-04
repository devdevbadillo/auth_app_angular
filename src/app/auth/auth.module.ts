import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { SignInPageComponent, SignUpPageComponent } from './pages/';

import { NavigationAuthComponent, TitleComponent, AuthSocialMediaComponent } from './components';

@NgModule({
  declarations: [
    // Layouts
    AuthLayoutComponent,

    //Pages
    SignInPageComponent,
    SignUpPageComponent,

    // Components
    NavigationAuthComponent,
    TitleComponent,
    AuthSocialMediaComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,

    // Routing
    AuthRoutingModule,

    // Common Module
    SharedModule,
  ]
})
export class AuthModule { }
