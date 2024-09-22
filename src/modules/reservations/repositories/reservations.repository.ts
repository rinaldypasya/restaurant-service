import { PrismaService } from '../../prisma/prisma.service';
import { BookingReservationDto } from '../dtos/booking-reservation.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepository {
  constructor(private prisma: PrismaService) {}

  public async insert(bookingReservationDto: BookingReservationDto) {
    return await this.prisma.reservations.create({
      data: {
        customer_id: bookingReservationDto.customer_id,
        table_id: bookingReservationDto.table_id,
        start_time: bookingReservationDto.start_time,
        end_time: bookingReservationDto.end_time,
        number_of_guests: bookingReservationDto.number_of_guests,
      },
    });
  }

  public async findByTimeSlot(bookingReservationDto: BookingReservationDto) {
    return await this.prisma.reservations.findMany({
      where: {
        start_time: {
          gte: bookingReservationDto.start_time,
        },
        end_time: {
          lte: bookingReservationDto.end_time,
        },
        table_id: bookingReservationDto.table_id,
      },
    });
  }
}
