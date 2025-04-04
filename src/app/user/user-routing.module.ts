import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRoutes } from "./api/UserRoutes";

import { UserLayoutComponent } from "../layouts/user-layout/user-layout.component";
import { UserPageComponent } from './pages/';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: UserRoutes.home,
        component: UserPageComponent
      },
      {
        path: '**',
        redirectTo: UserRoutes.home
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
