import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { SignInPageComponent, SignUpPageComponent } from './pages/';
import {AuthRoutes} from "./api/auth-routes";

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: AuthRoutes.signIn,
        component: SignInPageComponent
      },
      {
        path: AuthRoutes.signUp,
        component: SignUpPageComponent
      },
      {
        path: '**',
        redirectTo: AuthRoutes.signIn
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
