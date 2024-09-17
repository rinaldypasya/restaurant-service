import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomersModule } from '../customers/customers.module';
import { RestaurantTablesModule } from '../restaurant_tables/restaurant-tables.module';

@Module({
  imports: [PrismaModule, CustomersModule, RestaurantTablesModule],
})
export class AppModule {}
