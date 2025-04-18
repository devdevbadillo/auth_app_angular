import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import {
  AuthSocialMediaPageComponent,
  SignInPageComponent,
  SignUpPageComponent,
  RecoveryAccountPageComponent,
  ChangePasswordPageComponent,
  RefreshAccessToVerifyPageComponent
} from './pages/';

import { NavigationAuthComponent, TitleComponent, AuthSocialMediaSecctionComponent, AuthSocialMediaComponent } from './components';

@NgModule({
  declarations: [
    // Layouts
    AuthLayoutComponent,

    //Pages
    SignInPageComponent,
    SignUpPageComponent,
    AuthSocialMediaPageComponent,
    RecoveryAccountPageComponent,
    ChangePasswordPageComponent,
    RefreshAccessToVerifyPageComponent,

    // Components
    NavigationAuthComponent,
    TitleComponent,
    AuthSocialMediaComponent,
    AuthSocialMediaSecctionComponent,
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
