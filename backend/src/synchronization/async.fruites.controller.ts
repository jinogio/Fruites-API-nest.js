import { Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { FruitesApiService } from './fruites.api';
import { AsyncFruitesService } from './async.fruites.service';
import { EmailSesService } from 'src/SES-EMAIL/email.service';

@Controller()
export class AsyncFruitesController {
  constructor(
    private readonly fruitesApiService: FruitesApiService,
    private readonly fruiteService: AsyncFruitesService,
    private readonly emailService: EmailSesService,
  ) {}

  @Post('/sync')
  async createFruitesList() {
    try {
      const allFruites = await this.fruitesApiService.getAllFruites();

      let result = [];
      for (let i = 0; i < allFruites.length; i++) {
        const existingFruite = await this.fruiteService.findFruite(
          allFruites[i].id,
        );
        if (!existingFruite) {
          result.push(await this.fruiteService.registerFruit(allFruites[i]));
        }
      }

      // send email
      if (
        result.length > 0 &&
        process.env.SEND_EMAIL_ON_NEW_FRUITES === 'true'
      ) {
        await this.emailService.createEmailCommand(
          process.env.fromAdress,
          process.env.toAdress,
          `New Fruit(s) Discovered: \n${result
            .map((x, i) => `${i + 1}. ${x.name}`)
            .join('\n')}`,
        );
      }
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
