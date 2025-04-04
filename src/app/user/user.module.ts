import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './pages';
import {UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [

    // Pages
    UserPageComponent
  ],
  imports: [
    // Angular
    CommonModule,

    //Routing
    UserRoutingModule,

    //SharedModule
    SharedModule
  ]
})
export class UserModule { }
