import { UserRole } from '@waystea/types';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string;
      email: string;
      role: UserRole;
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: unknown;
  }
}