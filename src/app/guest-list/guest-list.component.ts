import {Component, OnInit} from '@angular/core';
import {GuestService} from '../services/guest.service';
import {Guest} from '../model/guest';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css'],
  providers: [GuestService]
})
export class GuestListComponent implements OnInit {
  guests: Guest[] = [];


  constructor(private guestService: GuestService) {
  }

  ngOnInit(): void {
    this.guestService.findAll()
      .subscribe(guests => this.guests = guests);
  }

}
