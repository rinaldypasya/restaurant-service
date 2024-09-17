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
import { RestaurantTablesService } from '../services/restaurant-tables.service';
import { CreateRestaurantTableDto } from '../dtos/create-restaurant-tables.dto';
import { UpdateRestaurantTableDto } from '../dtos/update-restaurant-tables.dto';
import { Response as ResponseType } from '../../util/enums/response.enum';
import { IdParamValidation } from '../../util/decorators/id-param-validation.decorator';
import { Prisma } from '@prisma/client';

@Controller('restaurant-tables')
export class RestaurantTablesController {
  constructor(
    private readonly restaurantTablesService: RestaurantTablesService,
  ) {}

  @Post()
  public async create(
    @Res() response,
    @Body() createRestaurantTableDto: CreateRestaurantTableDto,
  ) {
    try {
      const newRestaurantTable = await this.restaurantTablesService.create(
        createRestaurantTableDto,
      );
      return response.status(HttpStatus.CREATED).json({
        type: ResponseType.SUCCESS,
        message: 'RestaurantTable created',
        data: newRestaurantTable,
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
    const restaurantTables = await this.restaurantTablesService.findAll();
    return response.status(HttpStatus.OK).json({
      type: ResponseType.SUCCESS,
      message: 'Find all customer succeeds',
      data: restaurantTables,
    });
  }

  @Get('/:id')
  public async findOne(@Res() response, @Param() { id }: IdParamValidation) {
    try {
      const customer = await this.restaurantTablesService.findOne(+id);
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: 'RestaurantTable found',
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
    @Body() updateRestaurantTableDto: UpdateRestaurantTableDto,
  ) {
    try {
      const updatedRestaurantTable = await this.restaurantTablesService.update(
        +id,
        updateRestaurantTableDto,
      );
      return response.status(HttpStatus.OK).json({
        type: ResponseType.SUCCESS,
        message: 'RestaurantTable updated',
        data: updatedRestaurantTable,
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
      await this.restaurantTablesService.remove(+id);
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
