import mongoose, { Schema, model, Model } from 'mongoose';
import { Cart, CartItem } from '@waystea/types';

export interface ICartDocument extends Omit<Cart, '_id' | 'createdAt' | 'updatedAt'> {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

const cartItemSchema = new Schema<CartItem>(
  {
    product: {
      type: String,
      required: true,
    },
    name: {
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
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new Schema<ICartDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [cartItemSchema],
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

cartSchema.virtual('totalItems').get(function () {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

cartSchema.virtual('totalPrice').get(function () {
  return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
});

const CartModel: Model<ICartDocument> = mongoose.models.Cart || model<ICartDocument>('Cart', cartSchema);

export default CartModel;