import { Injectable } from '@nestjs/common';
import { CreateRestaurantTableDto } from '../dtos/create-restaurant-tables.dto';
import { UpdateRestaurantTableDto } from '../dtos/update-restaurant-tables.dto';
import { RestaurantTableRepository } from '../repositories/restaurant-tables.repository';

@Injectable()
export class RestaurantTablesService {
  constructor(private restaurantTableRepo: RestaurantTableRepository) {}

  public async create(createRestaurantTableDto: CreateRestaurantTableDto) {
    return await this.restaurantTableRepo.insert(createRestaurantTableDto);
  }

  public async findAll() {
    return await this.restaurantTableRepo.findAll();
  }

  public async findOne(id: number) {
    return await this.restaurantTableRepo.findOne(null, id);
  }

  public async update(
    id: number,
    updateRestaurantTableDto: UpdateRestaurantTableDto,
  ) {
    const existRestaurantTable = await this.restaurantTableRepo.findOne(
      null,
      id,
    );
    Object.assign(updateRestaurantTableDto, existRestaurantTable);
    return await this.restaurantTableRepo.update(id, updateRestaurantTableDto);
  }

  public async remove(id: number) {
    await this.restaurantTableRepo.findOne(null, id);
    return await this.restaurantTableRepo.delete(id);
  }
}
