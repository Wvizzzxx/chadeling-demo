import { FastifyInstance } from 'fastify';
import CartModel from '../models/Cart';
import OrderModel from '../models/Order';

interface CreateOrderInput {
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  comment?: string;
}

export default async function orderRoutes(app: FastifyInstance) {
  // Create order from cart
  app.post('/', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const { shippingAddress, comment } = request.body as CreateOrderInput;

      const cart = await CartModel.findOne({ user: request.user.id });
      if (!cart || cart.items.length === 0) {
        return reply.code(400).send({ success: false, error: 'Cart is empty' });
      }

      const order = new OrderModel({
        user: request.user.id,
        items: cart.items,
        totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
        shippingAddress,
        comment: comment || '',
        status: 'pending',
      });

      await order.save();

      // Clear cart
      cart.items = [];
      await cart.save();

      await order.populate('items.product', 'name price image');

      return reply.code(201).send({ success: true, data: order });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Get user orders
  app.get('/', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const { page = 1, limit = 10 } = request.query;
      const skip = (Number(page) - 1) * Number(limit);

      const orders = await OrderModel.find({ user: request.user.id })
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await OrderModel.countDocuments({ user: request.user.id });

      return reply.send({
        success: true,
        data: {
          orders,
          total,
          page: Number(page),
          limit: Number(limit),
        },
      });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Get single order
  app.get('/:id', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const order = await OrderModel.findOne({
        _id: request.params.id,
        user: request.user.id,
      });

      if (!order) {
        return reply.code(404).send({ success: false, error: 'Order not found' });
      }

      return reply.send({ success: true, data: order });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}