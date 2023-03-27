import * as mongoose from 'mongoose';

export interface Fruite extends mongoose.Document {
  id: string;
  genus: string;
  name: string;
  family: string;
  order: string;
  nutritions: {
    carbohydrates: string;
    protein: string;
    fat: string;
    calories: string;
    sugar: string;
  };
  favorite: boolean;
}
