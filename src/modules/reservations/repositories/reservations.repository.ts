import { PrismaService } from '../../prisma/prisma.service';
import { BookingReservationDto } from '../dtos/booking-reservation.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepository {
  constructor(private prisma: PrismaService) {}

  public async insert(tx: any, bookingReservationDto: BookingReservationDto) {
    if (tx === null) {
      tx = this.prisma;
    }
    return await tx.reservations.create({
      data: {
        customer_id: bookingReservationDto.customer_id,
        table_id: bookingReservationDto.table_id,
        start_time: bookingReservationDto.start_time,
        end_time: bookingReservationDto.end_time,
        number_of_guests: bookingReservationDto.number_of_guests,
      },
    });
  }

  public async findByTimeSlot(
    tx: any,
    bookingReservationDto: BookingReservationDto,
  ) {
    if (tx === null) {
      tx = this.prisma;
    }
    return await tx.reservations.findMany({
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
