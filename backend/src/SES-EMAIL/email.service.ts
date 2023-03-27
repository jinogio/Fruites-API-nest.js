import { SendEmailCommand } from '@aws-sdk/client-ses';
import { SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSesService {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
      },
    });
  }

  async createEmailCommand(
    fromAddress: string,
    toAddress: string,
    text: string,
  ) {
    const params = new SendEmailCommand({
      Destination: {
        CcAddresses: [toAddress],
        ToAddresses: [toAddress],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'New Fruits Discovered',
        },
      },
      Source: fromAddress,
      ReplyToAddresses: [],
    });

    return await this.sesClient.send(params);
  }
}
