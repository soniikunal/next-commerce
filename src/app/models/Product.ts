import mongoose, { Schema, Document, models, model } from "mongoose";

// TypeScript interface for Product
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// Export Model
export default models.Product || model<IProduct>("Product", ProductSchema);
