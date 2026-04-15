import mongoose, { Schema, model, Model } from 'mongoose';
import { Product } from '@waystea/types';

export interface IProductDocument extends Omit<Product, '_id' | 'createdAt' | 'updatedAt'> {
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: '/placeholder.jpg',
    },
    category: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const ProductModel: Model<IProductDocument> = mongoose.models.Product || model<IProductDocument>('Product', productSchema);

export default ProductModel;