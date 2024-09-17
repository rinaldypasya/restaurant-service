import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { CustomerRepository } from './repositories/customers.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomerRepository, CustomersService, PrismaService],
})
export class CustomersModule {}
