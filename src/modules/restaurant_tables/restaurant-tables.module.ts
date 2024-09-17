import { Module } from '@nestjs/common';
import { RestaurantTablesService } from './services/restaurant-tables.service';
import { RestaurantTablesController } from './controllers/restaurant-tables.controller';
import { RestaurantTableRepository } from './repositories/restaurant-tables.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RestaurantTablesController],
  providers: [
    RestaurantTableRepository,
    RestaurantTablesService,
    PrismaService,
  ],
})
export class RestaurantTablesModule {}
