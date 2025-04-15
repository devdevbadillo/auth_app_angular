import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import {
  AuthSocialMediaPageComponent,
  RecoveryAccountPageComponent,
  ChangePasswordPageComponent,
  SignInPageComponent,
  SignUpPageComponent, RefreshAccessToVerifyPageComponent
} from './pages/';

import {AuthRoutes} from "./api/auth-routes";
import {changePasswordGuard} from "./guards/change-password.guard";
import {verifyAccountGuard} from "./guards/verify-account.guard";
import {EmptyComponent} from "../shared/components/empty/empty.component";
import {refreshAccessToVerifyAccountGuard} from "./guards/refresh-access-to-verify-account.guard";

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
    path: AuthRoutes.recoveryAccount,
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: RecoveryAccountPageComponent
      }
    ]
  },
  {
    path: AuthRoutes.changePassword,
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: ChangePasswordPageComponent,
        canActivate: [changePasswordGuard]
      }
    ]
  },
  {
    path: AuthRoutes.refreshAccessToVerifyAccount,
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: RefreshAccessToVerifyPageComponent,
        canActivate: [refreshAccessToVerifyAccountGuard]
      }
    ]
  },
  {
    path: 'social-media',
    component: AuthSocialMediaPageComponent
  },
  {
    path: 'verify-account',
    component: EmptyComponent,
    canActivate: [verifyAccountGuard],
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
