import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookingReservationDto } from '../dtos/booking-reservation.dto';
import { ReservationRepository } from '../repositories/reservations.repository';
import {
  RESTAURANT_CLOSED_HOUR,
  RESTAURANT_OPEN_HOUR,
} from '../../util/consts/common.const';
import { CustomerRepository } from 'src/modules/customers/repositories/customers.repository';
import { RestaurantTableRepository } from 'src/modules/restaurant_tables/repositories/restaurant-tables.repository';
import { MailersService } from 'src/modules/mailers/services/mailer.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(
    private reservationRepo: ReservationRepository,
    private customerRepo: CustomerRepository,
    private restaurantTableRepo: RestaurantTableRepository,
    private mailerService: MailersService,
    private prisma: PrismaService,
  ) {}

  public async booking_reservation(
    bookingReservationDto: BookingReservationDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      // Ensure customer exist
      const customer = await this.customerRepo.findOne(
        tx,
        bookingReservationDto.customer_id,
      );

      // Ensure restaurant table exist
      await this.restaurantTableRepo.findOne(
        tx,
        bookingReservationDto.table_id,
      );

      // Ensure that a reservation cannot be made for a table that is already booked for the requested time slot
      const existReservations = await this.reservationRepo.findByTimeSlot(
        tx,
        bookingReservationDto,
      );
      if (existReservations) {
        throw new HttpException('Table already booked', HttpStatus.FORBIDDEN);
      }

      // Implement validation to ensure reservations can only be made during the restaurant's open hours
      const openTime = new Date().setHours(RESTAURANT_OPEN_HOUR);
      const closeTime = new Date().setHours(RESTAURANT_CLOSED_HOUR);
      if (
        bookingReservationDto.start_time.getTime() >= openTime &&
        bookingReservationDto.start_time.getTime() <= closeTime
      ) {
        throw new HttpException(
          'Reservation time out of open hours',
          HttpStatus.FORBIDDEN,
        );
      }

      // Create reserveration
      const newReservation = await this.reservationRepo.insert(
        tx,
        bookingReservationDto,
      );

      // Create an email to send to the relevant user about a successful booking.
      await this.mailerService.sendMail(customer.email);

      return newReservation;
    });
  }
}
