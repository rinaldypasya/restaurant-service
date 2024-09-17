import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantTableDto } from './create-restaurant-tables.dto';

export class UpdateRestaurantTableDto extends PartialType(
  CreateRestaurantTableDto,
) {}
