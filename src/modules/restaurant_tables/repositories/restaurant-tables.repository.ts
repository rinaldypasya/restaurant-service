import { PrismaService } from '../../prisma/prisma.service';
import { CreateRestaurantTableDto } from '../dtos/create-restaurant-tables.dto';
import { Injectable } from '@nestjs/common';
import { UpdateRestaurantTableDto } from '../dtos/update-restaurant-tables.dto';

@Injectable()
export class RestaurantTableRepository {
  constructor(private prisma: PrismaService) {}

  public async insert(createRestaurantTableDto: CreateRestaurantTableDto) {
    return await this.prisma.restaurant_tables.create({
      data: {
        number: createRestaurantTableDto.number,
        capacity: createRestaurantTableDto.capacity,
        is_reserved: createRestaurantTableDto.is_reserved,
      },
    });
  }

  public async findAll() {
    return await this.prisma.restaurant_tables.findMany();
  }

  public async findOne(tx: any, id: number) {
    if (tx === null) {
      tx = this.prisma;
    }
    return await tx.restaurant_tables.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async update(
    id: number,
    updateRestaurantTableDto: UpdateRestaurantTableDto,
  ) {
    return await this.prisma.restaurant_tables.update({
      where: {
        id: id,
      },
      data: {
        number: updateRestaurantTableDto.number,
        capacity: updateRestaurantTableDto.capacity,
        is_reserved: updateRestaurantTableDto.is_reserved,
      },
    });
  }

  public async delete(id: number) {
    return await this.prisma.restaurant_tables.delete({
      where: {
        id: id,
      },
    });
  }
}
