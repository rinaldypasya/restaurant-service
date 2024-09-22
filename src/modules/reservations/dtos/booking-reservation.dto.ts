import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingReservationDto {
  id?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  customer_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  table_id: number;

  @IsNotEmpty()
  @ApiProperty()
  start_time: Date;

  @IsNotEmpty()
  @ApiProperty()
  end_time: Date;

  @IsNotEmpty()
  @ApiProperty()
  number_of_guests: number;
}
