import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FruiteSchema } from 'src/DB/schema/fruites.schema';
import { FruitesService } from './fruites.service';
import { FruitesController } from './fruites.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Fruite', schema: FruiteSchema }]),
  ],
  controllers: [FruitesController],
  providers: [FruitesService, FruitesController],
  exports: [FruitesService],
})
export class FruitesModule {}
