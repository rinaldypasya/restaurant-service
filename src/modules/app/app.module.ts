import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomersModule } from '../customers/customers.module';
import { RestaurantTablesModule } from '../restaurant_tables/restaurant-tables.module';
import { ConfigModule } from '@nestjs/config';
import { MailersModule } from '../mailers/mailer.module';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    CustomersModule,
    RestaurantTablesModule,
    ReservationsModule,
    MailersModule,
  ],
})
export class AppModule {}
