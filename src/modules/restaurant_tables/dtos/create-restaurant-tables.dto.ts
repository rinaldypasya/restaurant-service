import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantTableDto {
  id?: number;

  @IsNumber()
  @ApiProperty()
  number: number;

  @IsNumber()
  @ApiProperty()
  capacity: number;

  @IsBoolean()
  @ApiProperty()
  is_reserved: boolean;
}
