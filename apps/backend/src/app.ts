import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import authPlugin from './plugins/auth';
import { connectDB } from './db';
import { config } from './config/env';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({ logger: true });

// CORS
await app.register(cors, {
  origin: config.corsOrigin,
  credentials: true,
});

// Static files (uploads)
await app.register(fastifyStatic, {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/',
});

// Multipart (file uploads)
await app.register(fastifyMultipart);

// JWT Auth
await app.register(authPlugin);

// Routes
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';
import adminRoutes from './routes/admin';

await app.register(authRoutes, { prefix: '/api/auth' });
await app.register(productRoutes, { prefix: '/api/products' });
await app.register(cartRoutes, { prefix: '/api/cart' });
await app.register(orderRoutes, { prefix: '/api/orders' });
await app.register(adminRoutes, { prefix: '/api/admin' });

// Health check
app.get('/api/health', async () => {
  return { success: true, message: 'Server is running' };
});

// Error handler
app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  reply.status(error.statusCode || 500).send({
    success: false,
    error: error.name,
    message: error.message,
  });
});

export async function startApp() {
  await connectDB();

  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

export default app;