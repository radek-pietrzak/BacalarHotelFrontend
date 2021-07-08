import {Guest} from './guest';
import {Reservation} from './reservation';

export class GuestReservation {
  id?: number;
  guest: Guest;
  reservations?: Reservation[];
}
