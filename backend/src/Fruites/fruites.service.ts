import { Fruite } from 'src/DB/interface/fruites.interface';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { SoftDeleteModel, softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Injectable()
export class FruitesService {
  constructor(
    @InjectModel('Fruite')
    private readonly fruiteModel: SoftDeleteModel<Fruite>,
  ) {}

  async listFruitesPagination(
    page: number,
    size: number,
    name?: string,
    family?: string,
  ): Promise<Partial<Fruite>[]> {
    const filter = {
      ...(name ? { name: { $regex: name, $options: 'i' } } : {}),
      ...(family ? { family } : {}),
    };

    const fruitesList = await this.fruiteModel
      .find(filter)
      .sort({ _id: 'asc' })
      .skip((page - 1) * size)
      .limit(size);

    return fruitesList;
  }

  async addFruitToFavorites(id: string) {
    const existingFruite = await this.fruiteModel.findOne({
      id,
    });

    if (!existingFruite) {
      throw new Error('No fruit found');
    }

    existingFruite.favorite = true;
    return await existingFruite.save();
  }

  async removeFruitFromFavorites(id: string) {
    const existingFruite = await this.fruiteModel.findOne({
      id,
    });

    if (!existingFruite) {
      throw new Error('No fruit found');
    }

    existingFruite.favorite = false;
    return await existingFruite.save();
  }

  async getFavorites() {
    const allFavorites = await this.fruiteModel.find({ favorite: true });

    if (!allFavorites) {
      throw new Error('You dont have a favorite fruit');
    }
    return allFavorites;
  }

  async getFamilies() {
    const list = await this.fruiteModel.distinct('family');

    return list;
  }

  async checkFavoriteLimit() {
    const checkLimit = await this.getFavorites();
    if (checkLimit.length >= 10) {
      throw new Error('The limit for adding to favorites has expired');
    }
  }

  async totalNutritions() {
    const allFavoriteFruites = await this.fruiteModel.find({ favorite: true });

    const totals = {};

    allFavoriteFruites.forEach((fruit) => {
      Object.entries(fruit.nutritions).forEach(([key, value]) => {
        totals[key] = (totals[key] ?? 0) + value;
      });
    });

    return totals;
  }
}
