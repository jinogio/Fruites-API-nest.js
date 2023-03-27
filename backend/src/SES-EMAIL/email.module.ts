import { Module } from '@nestjs/common';

import { EmailSesService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [EmailSesService],
  exports: [EmailSesService],
})
export class EmailSesModule {}
