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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RoomFormComponent} from './room-form/room-form.component';
import {GuestListComponent} from './guest-list/guest-list.component';
import {ExpenseListComponent} from './expense-list/expense-list.component';
import {ExpenseAddComponent} from './expense-add/expense-add.component';
import {ExpenseListPostComponent} from './expense-list-post/expense-list-post.component';

const routes: Routes = [
  {
    component: GuestRegistrationComponent,
    path: 'guest-registration'
  }, {
    component: LoginComponent,
    path: 'log-in'
  }, {
    component: BookingComponent,
    path: 'booking'
  }, {
    component: RoomListComponent,
    path: 'room-list'
  }, {
    component: HomeComponent,
    path: 'home',
  }, {
    component: RoomFormComponent,
    path: 'room-form',
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    component: GuestListComponent,
    path: 'guest-list'
  }, {
    component: ExpenseListComponent,
    path: 'expense-list'
  }, {
    component: ExpenseAddComponent,
    path: 'expense-add'
  }, {
    component: ExpenseListPostComponent,
    path: 'expense-list-post'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GuestRegistrationComponent,
    LoginComponent,
    BookingComponent,
    RoomListComponent,
    HomeComponent,
    RoomFormComponent,
    GuestListComponent,
    ExpenseListComponent,
    ExpenseAddComponent,
    ExpenseListPostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
