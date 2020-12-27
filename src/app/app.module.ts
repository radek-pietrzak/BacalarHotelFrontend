import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {GuestRegistrationComponent} from './guest-registration/guest-registration.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {BookingComponent} from './booking/booking.component';
import {RoomListComponent} from './room-list/room-list.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [{
  component: GuestRegistrationComponent,
  path: 'guest-registration'
}, {
  component: LoginComponent,
  path: 'log-in'
},
  {
    component: BookingComponent,
    path: 'booking'
  }, {
    component: RoomListComponent,
    path: 'room-list'
  }, {
    component: HomeComponent,
    path: 'home',
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GuestRegistrationComponent,
    LoginComponent,
    BookingComponent,
    RoomListComponent,
    HomeComponent
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
