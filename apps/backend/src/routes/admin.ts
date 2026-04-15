import { FastifyInstance } from 'fastify';
import User from '../models/User';
import Product from '../models/Product';
import OrderModel from '../models/Order';

interface ProductInput {
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  weight: number;
  inStock?: boolean;
}

interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  weight?: number;
  inStock?: boolean;
}

interface UpdateOrderStatusInput {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

// Middleware to check admin role
const adminOnly = async (request: any, reply: any) => {
  if (request.user.role !== 'admin') {
    return reply.code(403).send({ success: false, error: 'Admin access required' });
  }
};

export default async function adminRoutes(app: FastifyInstance) {
  // Get dashboard stats
  app.get('/stats', { preHandler: [app.authenticate as any, adminOnly] }, async (_request: any, reply) => {
    try {
      const [totalUsers, totalProducts, totalOrders, totalRevenue] = await Promise.all([
        User.countDocuments({ role: 'customer' }),
        Product.countDocuments(),
        OrderModel.countDocuments(),
        OrderModel.aggregate([
          { $match: { status: { $nin: ['cancelled'] } } },
          { $group: { _id: null, total: { $sum: '$totalPrice' } } },
        ]),
      ]);

      return reply.send({
        success: true,
        data: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue[0]?.total || 0,
        },
      });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Admin: Create product
  app.post('/products', { preHandler: [app.authenticate as any, adminOnly] }, async (request: any, reply) => {
    try {
      const product = new Product(request.body as ProductInput);
      await product.save();
      return reply.code(201).send({ success: true, data: product });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Admin: Update product
  app.put('/products/:id', { preHandler: [app.authenticate as any, adminOnly] }, async (request: any, reply) => {
    try {
      const product = await Product.findByIdAndUpdate(
        request.params.id,
        request.body as ProductUpdateInput,
        { new: true, runValidators: true }
      );
      if (!product) {
        return reply.code(404).send({ success: false, error: 'Product not found' });
      }
      return reply.send({ success: true, data: product });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Admin: Delete product
  app.delete('/products/:id', { preHandler: [app.authenticate as any, adminOnly] }, async (request: any, reply) => {
    try {
      const product = await Product.findByIdAndDelete(request.params.id);
      if (!product) {
        return reply.code(404).send({ success: false, error: 'Product not found' });
      }
      return reply.send({ success: true, message: 'Product deleted' });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Admin: Get all orders
  app.get('/orders', { preHandler: [app.authenticate as any, adminOnly] }, async (request: any, reply) => {
    try {
      const { page = 1, limit = 20, status } = request.query;
      const query: any = {};
      if (status) query.status = status;

      const skip = (Number(page) - 1) * Number(limit);
      const orders = await OrderModel.find(query)
        .populate('user', 'name email')
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await OrderModel.countDocuments(query);

      return reply.send({
        success: true,
        data: { orders, total, page: Number(page), limit: Number(limit) },
      });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Admin: Update order status
  app.put('/orders/:id/status', { preHandler: [app.authenticate as any, adminOnly] }, async (request: any, reply) => {
    try {
      const { status } = request.body as UpdateOrderStatusInput;
      const order = await OrderModel.findByIdAndUpdate(
        request.params.id,
        { status },
        { new: true }
      );
      if (!order) {
        return reply.code(404).send({ success: false, error: 'Order not found' });
      }
      return reply.send({ success: true, data: order });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Admin: Get all users
  app.get('/users', { preHandler: [app.authenticate as any, adminOnly] }, async (_request: any, reply) => {
    try {
      const users = await User.find({ role: 'customer' }).select('-passwordHash').sort({ createdAt: -1 });
      return reply.send({ success: true, data: users });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}