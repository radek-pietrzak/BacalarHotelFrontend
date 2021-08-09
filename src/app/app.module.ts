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
import {ExpenseListComponent} from './expense/expense-list/expense-list.component';
import { ExpenseDetailsComponent } from './expense/expense-details/expense-details.component';
import { ExpenseSpecCriteriaComponent } from './expense/expense-spec-criteria/expense-spec-criteria.component';
import { ExpenseSpecFormComponent } from './expense/expense-spec-form/expense-spec-form.component';
import { ExpenseCurrentMonthHeaderComponent } from './expense/expense-current-month-header/expense-current-month-header.component';
import { ExpensePageCriteriaComponent } from './expense/expense-page-criteria/expense-page-criteria.component';

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
    component: ExpenseDetailsComponent,
    path: 'expense-details/:id'
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
    ExpenseListComponent,
    ExpenseDetailsComponent,
    ExpenseSpecCriteriaComponent,
    ExpenseSpecFormComponent,
    ExpenseCurrentMonthHeaderComponent,
    ExpensePageCriteriaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ExpenseSpecCriteriaComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
