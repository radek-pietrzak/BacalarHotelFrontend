import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AppComponent]
})
export class NavbarComponent implements OnInit {
  title: string;

  constructor(appComponent: AppComponent) {
    this.title = appComponent.title;
  }

  ngOnInit(): void {
  }

}
