import fastify from 'fastify'
import dotenv from 'dotenv'

import UserRepository from './repositories/user-repository'
import UserController from './controllers/user/user-controller'
import { PrismaClient } from '@prisma/client'
import BcryptService from './services/bcrypt-service'

dotenv.config()

const server = fastify()

const prisma = new PrismaClient();

if (process.env.BCRYPT_SALT_ROUNDS === undefined) {
  throw new Error('SALT_ROUNDS is not defined');
}

const bcryptService = new BcryptService(parseInt(process.env.BCRYPT_SALT_ROUNDS));

const userRepository = new UserRepository(prisma, bcryptService);
const userController = new UserController(userRepository);

if (process.env.PORT === undefined) {
  throw new Error('PORT is not defined');
}

server.post('/api/users/register', userController.register.bind(userController));
server.post('/api/users/login', userController.login.bind(userController));

server.listen({ port: parseInt(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});

