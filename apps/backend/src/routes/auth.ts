import { FastifyInstance, FastifyRequest } from 'fastify';
import User from '../models/User';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads/avatars');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

interface RegisterBody {
  email: string;
  name: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export default async function authRoutes(app: FastifyInstance) {
  // Register
  app.post<{ Body: RegisterBody }>('/register', async (request, reply) => {
    try {
      const { email, name, password } = request.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return reply.code(400).send({ success: false, error: 'Email already exists' });
      }

      const user = new User({ email, name, passwordHash: password });
      await user.save();

      const token = app.jwt.sign(
        { id: user._id!.toString(), email: user.email, role: user.role },
        { expiresIn: '7d' }
      );

      return reply.send({
        success: true,
        data: {
          token,
          user: {
            _id: user._id!.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Login
  app.post<{ Body: LoginBody }>('/login', async (request, reply) => {
    try {
      const { email, password } = request.body;
      console.log('Login attempt:', email, 'password:', password);

      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found:', email);
        return reply.code(401).send({ success: false, error: 'Invalid credentials' });
      }
      console.log('User found, comparing password...');

      const isValid = await user.comparePassword(password);
      console.log('Password valid:', isValid);
      if (!isValid) {
        return reply.code(401).send({ success: false, error: 'Invalid credentials' });
      }

      const token = app.jwt.sign(
        { id: user._id!.toString(), email: user.email, role: user.role },
        { expiresIn: '7d' }
      );

      return reply.send({
        success: true,
        data: {
          token,
          user: {
            _id: user._id!.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Get profile
  app.get('/profile', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const user = await User.findById(request.user.id);
      if (!user) {
        return reply.code(404).send({ success: false, error: 'User not found' });
      }
      return reply.send({ success: true, data: user });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });

  // Upload avatar
  app.post('/avatar', { preHandler: [app.authenticate as any] }, async (request: any, reply) => {
    try {
      const data = await request.file();
      if (!data) {
        return reply.code(400).send({ success: false, error: 'No file uploaded' });
      }

      const ext = data.mimetype.split('/')[1] || 'jpg';
      const filename = `${request.user.id}_${Date.now()}.${ext}`;
      const filepath = path.join(uploadsDir, filename);

      const chunks: Buffer[] = [];
      for await (const chunk of data.file) {
        chunks.push(chunk);
      }
      fs.writeFileSync(filepath, Buffer.concat(chunks));

      const avatarUrl = `/uploads/avatars/${filename}`;
      const user = await User.findByIdAndUpdate(request.user.id, { avatar: avatarUrl }, { new: true });

      return reply.send({ success: true, data: user });
    } catch (error: any) {
      reply.code(500).send({ success: false, error: error.message });
    }
  });
}
