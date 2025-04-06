import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import {AuthSocialMediaPageComponent, SignInPageComponent, SignUpPageComponent} from './pages/';
import {AuthRoutes} from "./api/auth-routes";

const routes: Routes = [
  {
    path: AuthRoutes.signIn,
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: SignInPageComponent
      }
    ]
  },
  {
    path: AuthRoutes.signUp,
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: SignUpPageComponent
      }
    ]
  },
  {
    path: 'social-media',
    component: AuthSocialMediaPageComponent
  },
  {
    path: '**',
    redirectTo: AuthRoutes.signIn
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
