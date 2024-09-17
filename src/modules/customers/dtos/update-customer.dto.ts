import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address?: string;
}
