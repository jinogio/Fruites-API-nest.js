import {
  HttpException,
  Controller,
  Get,
  Param,
  Put,
  HttpStatus,
  Query,
  ParseIntPipe,
  Post,
  Delete,
} from '@nestjs/common';

import { FruitesService } from './fruites.service';

@Controller('fruits')
export class FruitesController {
  constructor(private readonly fruiteService: FruitesService) {}

  @Get('/')
  async listFruitesPagination(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('name') name?: string,
    @Query('family') family?: string,
  ) {
    const list = await this.fruiteService.listFruitesPagination(
      page ?? 1,
      size ?? 10,
      name,
      family,
    );

    return list;
  }

  @Post('/:id/favorite')
  async addFruitToFavorites(@Param('id') id: string) {
    try {
      await this.fruiteService.checkFavoriteLimit();

      const result = await this.fruiteService.addFruitToFavorites(id);

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id/favorite')
  async removeFruitFromFavorites(@Param('id') id: string) {
    try {
      const result = await this.fruiteService.removeFruitFromFavorites(id);

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/favorites')
  async getFavorites() {
    try {
      const result = await this.fruiteService.getFavorites();

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/families')
  async getFamilies() {
    try {
      const result = await this.fruiteService.getFamilies();

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/favorites/nutritions')
  async totalNutritions() {
    try {
      const nutritions = await this.fruiteService.totalNutritions();

      return nutritions;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
