import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { CustomerRepository } from '../repositories/customers.repository';

@Injectable()
export class CustomersService {
  constructor(private customerRepo: CustomerRepository) {}

  public async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepo.insert(createCustomerDto);
  }

  public async findAll() {
    return await this.customerRepo.findAll();
  }

  public async findOne(id: number) {
    return await this.customerRepo.findOne(id);
  }

  public async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const existCustomer = await this.customerRepo.findOne(id);
    Object.assign(updateCustomerDto, existCustomer);
    return await this.customerRepo.update(id, updateCustomerDto);
  }

  public async remove(id: number) {
    await this.customerRepo.findOne(id);
    return await this.customerRepo.delete(id);
  }
}
