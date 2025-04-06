import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

import { activePublic } from './auth/guards/public.guard';
import { activeSecure } from "./user/guards/secure.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [activePublic]
  },
  {
    path: 'app',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [activeSecure]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
