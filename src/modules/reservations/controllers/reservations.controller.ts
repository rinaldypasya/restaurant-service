import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ReservationService } from '../services/reservations.service';
import { BookingReservationDto } from '../dtos/booking-reservation.dto';
import { Response as ResponseType } from '../../util/enums/response.enum';
import { Prisma } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  public async booking_reservation(
    @Res() response,
    @Body() bookingReservationDto: BookingReservationDto,
  ) {
    try {
      const newReservation = await this.reservationService.booking_reservation(
        bookingReservationDto,
      );
      return response.status(HttpStatus.CREATED).json({
        type: ResponseType.SUCCESS,
        message: 'Reservation created',
        data: newReservation,
      });
    } catch (e) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (e.code == 'P2025') {
        status = HttpStatus.NOT_FOUND;
      }
      if (e instanceof Prisma.PrismaClientValidationError) {
        status = HttpStatus.BAD_REQUEST;
      }
      return response.status(status).json({
        type: ResponseType.ERROR,
        message: e.message,
        data: null,
      });
    }
  }
}
