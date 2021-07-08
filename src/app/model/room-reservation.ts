import {Reservation} from './reservation';
import {Room} from './room';

export class RoomReservation {
  id?: number;
  room: Room;
  reservations?: Reservation[];
}
