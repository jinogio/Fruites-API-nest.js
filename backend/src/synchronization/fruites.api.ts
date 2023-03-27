import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class FruitesApiService {
  async getAllFruites() {
    try {
      const { data } = await axios.get(`https://fruityvice.com/api/fruit/all`);
      return data;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
