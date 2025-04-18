import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { NgxSonnerToaster } from 'ngx-sonner';

@NgModule({
  declarations: [
    AppComponent,
    UserLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // Common module
    SharedModule,

    // External
    NgxSonnerToaster
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
