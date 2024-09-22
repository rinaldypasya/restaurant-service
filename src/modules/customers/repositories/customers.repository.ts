import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  public async insert(createCustomerDto: CreateCustomerDto) {
    return await this.prisma.customers.create({
      data: {
        full_name: createCustomerDto.full_name,
        phone_number: createCustomerDto.phone_number,
        email: createCustomerDto.email,
        address: createCustomerDto.address,
        password: bcrypt.hashSync(createCustomerDto.password, 10),
      },
    });
  }

  public async findAll() {
    return await this.prisma.customers.findMany();
  }

  public async findOne(tx: any, id: number) {
    if (tx === null) {
      tx = this.prisma;
    }
    return await tx.customers.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.prisma.customers.update({
      where: {
        id: id,
      },
      data: {
        full_name: updateCustomerDto.full_name,
        phone_number: updateCustomerDto.phone_number,
        email: updateCustomerDto.email,
        address: updateCustomerDto.address,
      },
    });
  }

  public async delete(id: number) {
    return await this.prisma.customers.delete({
      where: {
        id: id,
      },
    });
  }
}
