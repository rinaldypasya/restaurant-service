import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailersService } from '../mailers/services/mailer.service';
import { ReservationRepository } from './repositories/reservations.repository';
import { ReservationService } from './services/reservations.service';
import { CustomerRepository } from '../customers/repositories/customers.repository';
import { RestaurantTableRepository } from '../restaurant_tables/repositories/restaurant-tables.repository';

@Module({
  controllers: [ReservationsController],
  providers: [
    CustomerRepository,
    RestaurantTableRepository,
    ReservationRepository,
    ReservationService,
    PrismaService,
    MailersService,
  ],
})
export class ReservationsModule {}
