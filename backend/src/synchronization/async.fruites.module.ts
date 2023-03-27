import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FruitesApiService } from './fruites.api';
import { AsyncFruitesController } from './async.fruites.controller';
import { FruiteSchema } from 'src/DB/schema/fruites.schema';
import { AsyncFruitesService } from './async.fruites.service';
import { EmailSesService } from 'src/SES-EMAIL/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Fruite', schema: FruiteSchema }]),
  ],
  controllers: [AsyncFruitesController],
  providers: [
    FruitesApiService,
    AsyncFruitesController,
    AsyncFruitesService,
    EmailSesService,
  ],
  exports: [FruitesApiService, AsyncFruitesService, EmailSesService],
})
export class AsyncFruitesModule {}
