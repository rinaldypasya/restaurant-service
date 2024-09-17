import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  id?: number;

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
