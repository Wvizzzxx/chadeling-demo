import mongoose, { Schema, model, Model } from 'mongoose';
import { Order, OrderItem, ShippingAddress, OrderStatus } from '@waystea/types';

export interface IOrderDocument extends Omit<Order, '_id' | 'createdAt' | 'updatedAt'> {
  _id?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderItemSchema = new Schema<OrderItem>(
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

const shippingAddressSchema = new Schema<ShippingAddress>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    totalItems: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: shippingAddressSchema,
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    comment: {
      type: String,
      default: '',
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

const OrderModel: Model<IOrderDocument> = mongoose.models.Order || model<IOrderDocument>('Order', orderSchema);

export default OrderModel;