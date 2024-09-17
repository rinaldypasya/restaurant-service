import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { Response as ResponseType } from '../../util/enums/response.enum';
import { IdParamValidation } from '../../util/decorators/id-param-validation.decorator';
import { Prisma } from '@prisma/client';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  public async create(
    @Res() response,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    try {
      const newCustomer = await this.customersService.create(createCustomerDto);
      return response.status(HttpStatus.CREATED).json({
        type: ResponseType.SUCCESS,
        message: 'Customer created',
        data: newCustomer,
      });
    } catch (e) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        type: ResponseType.ERROR,
        message: e.message,
        data: null,
      });
    }
  }

  @Get()
  public async findAll(@Res() response) {
    const customers = await this.customersService.findAll();
    return response.status(HttpStatus.OK).json({
      type: ResponseType.SUCCESS,
      message: 'Find all customer succeeds',
      data: customers,
    });
  }

  @Get('/:id')
  public async findOne(@Res() response, @Param() { id }: IdParamValidation) {
    try {
      const customer = await this.customersService.findOne(+id);
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: 'Customer found',
        data: customer,
      });
    } catch (e) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (e.code == 'P2025') {
        status = HttpStatus.NOT_FOUND;
      }
      if (e instanceof Prisma.PrismaClientValidationError) {
        status = HttpStatus.BAD_REQUEST;
      }
      return response.status(status).json({
        type: ResponseType.ERROR,
        message: e.message,
        data: null,
      });
    }
  }

  @Patch('/:id')
  public async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    try {
      const updatedCustomer = await this.customersService.update(
        +id,
        updateCustomerDto,
      );
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: 'Customer updated',
        data: updatedCustomer,
      });
    } catch (e) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (e.code == 'P2025') {
        status = HttpStatus.NOT_FOUND;
      }
      if (e instanceof Prisma.PrismaClientValidationError) {
        status = HttpStatus.BAD_REQUEST;
      }
      return response.status(status).json({
        type: ResponseType.ERROR,
        message: e.message,
        data: null,
      });
    }
  }

  @Delete('/:id')
  public async remove(@Res() response, @Param('id') id: string) {
    try {
      await this.customersService.remove(+id);
    } catch (e) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      if (e.code == 'P2025') {
        status = HttpStatus.NOT_FOUND;
      }
      if (e instanceof Prisma.PrismaClientValidationError) {
        status = HttpStatus.BAD_REQUEST;
      }
      return response.status(status).json({
        type: ResponseType.ERROR,
        message: e.message,
        data: null,
      });
    }
  }
}
