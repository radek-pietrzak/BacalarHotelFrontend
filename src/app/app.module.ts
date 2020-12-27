import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {GuestRegistrationComponent} from './guest-registration/guest-registration.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [{
  component: GuestRegistrationComponent,
  path: 'guest-registration'
}, {
  component: LoginComponent,
  path: 'log-in'
}];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GuestRegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
