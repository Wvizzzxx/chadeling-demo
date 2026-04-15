import { FastifyInstance } from 'fastify';
import Product from '../models/Product';

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

export default async function productRoutes(app: FastifyInstance) {
  // Get all products
  app.get('/', async (request: any, reply) => {
    try {
      const { page = 1, limit = 12, category, search } = request.query;
      const query: any = {};

      if (category) query.category = category;
      if (search) {
        query.$text = { $search: search };
      }

      const skip = (Number(page) - 1) * Number(limit);
      const products = await Product.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

      const total = await Product.countDocuments(query);

      return reply.send({
        success: true,
        data: {
          products,
          total,
          page: Number(page),
          limit: Number(limit),
        },
      });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Get single product
  app.get('/:id', async (request: any, reply) => {
    try {
      const product = await Product.findById(request.params.id);
      if (!product) {
        return reply.code(404).send({ success: false, error: 'Product not found' });
      }
      return reply.send({ success: true, data: product });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Create product (admin only)
  app.post('/', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      if (request.user.role !== 'admin') {
        return reply.code(403).send({ success: false, error: 'Admin access required' });
      }

      const product = new Product(request.body as ProductInput);
      await product.save();
      return reply.code(201).send({ success: true, data: product });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Update product (admin only)
  app.put('/:id', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      if (request.user.role !== 'admin') {
        return reply.code(403).send({ success: false, error: 'Admin access required' });
      }

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

  // Delete product (admin only)
  app.delete('/:id', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      if (request.user.role !== 'admin') {
        return reply.code(403).send({ success: false, error: 'Admin access required' });
      }

      const product = await Product.findByIdAndDelete(request.params.id);
      if (!product) {
        return reply.code(404).send({ success: false, error: 'Product not found' });
      }
      return reply.send({ success: true, message: 'Product deleted' });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}