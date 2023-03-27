import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AsyncFruitesModule } from './synchronization/async.fruites.module';
import { FruitesModule } from './Fruites/fruites.module';
import { EmailSesModule } from './SES-EMAIL/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AsyncFruitesModule,
    EmailSesModule,
    FruitesModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
