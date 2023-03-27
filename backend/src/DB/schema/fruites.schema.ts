import * as mongoose from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
export const FruiteSchema = new mongoose.Schema(
  {
    id: { type: String },
    genus: { type: String },
    name: { type: String },
    family: { type: String },
    order: { type: String },
    nutritions: { type: Object },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true, validateBeforeSave: false },
);

FruiteSchema.plugin(softDeletePlugin);
