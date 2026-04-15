import { FastifyInstance } from 'fastify';
import CartModel from '../models/Cart';
import Product from '../models/Product';

export default async function cartRoutes(app: FastifyInstance) {
  // Get user cart
  app.get('/', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      let cart = await CartModel.findOne({ user: request.user.id }).populate('items.product', 'name price image');
      
      if (!cart) {
        cart = new CartModel({ user: request.user.id, items: [] });
        await cart.save();
      }

      return reply.send({ success: true, data: cart });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Add item to cart
  app.post('/add', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const { productId, quantity } = request.body;

      const product = await Product.findById(productId);
      if (!product) {
        return reply.code(404).send({ success: false, error: 'Product not found' });
      }

      let cart = await CartModel.findOne({ user: request.user.id });

      if (!cart) {
        cart = new CartModel({ user: request.user.id, items: [] });
      }

      const existingItem = cart.items.find((item) => item.product === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        });
      }

      await cart.save();
      await cart.populate('items.product', 'name price image');

      return reply.send({ success: true, data: cart });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Update item quantity
  app.put('/item', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const { productId, quantity } = request.body;

      const cart = await CartModel.findOne({ user: request.user.id });
      if (!cart) {
        return reply.code(404).send({ success: false, error: 'Cart not found' });
      }

      const item = cart.items.find((item) => item.product === productId);
      if (!item) {
        return reply.code(404).send({ success: false, error: 'Item not found' });
      }

      if (quantity <= 0) {
        cart.items = cart.items.filter((item) => item.product !== productId);
      } else {
        item.quantity = quantity;
      }

      await cart.save();
      await cart.populate('items.product', 'name price image');

      return reply.send({ success: true, data: cart });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Remove item from cart
  app.delete('/item/:productId', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const cart = await CartModel.findOne({ user: request.user.id });
      if (!cart) {
        return reply.code(404).send({ success: false, error: 'Cart not found' });
      }

      cart.items = cart.items.filter((item) => item.product !== request.params.productId);
      await cart.save();
      await cart.populate('items.product', 'name price image');

      return reply.send({ success: true, data: cart });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Clear cart
  app.delete('/clear', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const cart = await CartModel.findOne({ user: request.user.id });
      if (!cart) {
        return reply.code(404).send({ success: false, error: 'Cart not found' });
      }

      cart.items = [];
      await cart.save();

      return reply.send({ success: true, data: cart });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}