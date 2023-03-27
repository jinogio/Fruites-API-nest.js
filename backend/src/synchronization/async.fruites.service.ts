import { Fruite } from 'src/DB/interface/fruites.interface';
import { IFruiteDataDto } from './async-fruites-dto/async.fruites.data.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class AsyncFruitesService {
  constructor(
    @InjectModel('Fruite')
    private readonly fruiteModel: SoftDeleteModel<Fruite>,
  ) {}

  async registerFruit(fruiteData: IFruiteDataDto): Promise<Partial<Fruite>> {
    const fruite = new this.fruiteModel({
      ...fruiteData,
    });

    return await fruite.save();
  }

  async findFruite(id: string) {
    return await this.fruiteModel.findOne({
      id: id,
    });
  }
}
