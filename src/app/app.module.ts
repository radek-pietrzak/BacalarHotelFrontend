import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GuestRegistrationComponent } from './guest-registration/guest-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GuestRegistrationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
