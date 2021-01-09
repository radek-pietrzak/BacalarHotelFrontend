import {Component} from '@angular/core';
import {Room} from '../model/room';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent {
  room: Room;

  // constructor(
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private roomService: RoomService) {
  //   this.room = new Room();
  // }

  // onSubmit(): void {
  //   this.roomService.save(this.room).subscribe(result => this.gotoRoomList());
  // }


  // private gotoRoomList(): void {
  //   this.router.navigate(['/room-list']);
  // }
}
