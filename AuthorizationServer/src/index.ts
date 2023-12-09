#!/bin/node

import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { withRefResolver } from "fastify-zod";

import dotenv from 'dotenv';
dotenv.config();

import UserRepository from './repositories/user-repository'
import UserController from './controllers/user/user-controller'
import { PrismaClient } from '@prisma/client'
import BcryptService from './services/security/hashing/bcrypt-service'
import JWTUserTokenService from "./services/security/tokens/user/jwt-user-token-service";
import * as jose from 'jose';

async function main() {

    const prisma = new PrismaClient();

    if (process.env.BCRYPT_SALT_ROUNDS === undefined) {
      throw new Error('BCRYPT_SALT_ROUNDS is not defined');
    }
    
    const server = require('fastify')({ logger: true });
    
    const bcryptService = new BcryptService(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const userRepository = new UserRepository(prisma, bcryptService);
    
    const userKeyPair = await jose.generateKeyPair('RS256', { modulusLength: 2048 });
    const jwtUserTokenService = new JWTUserTokenService(userKeyPair.privateKey, userKeyPair.publicKey);

    const userController = new UserController(userRepository, jwtUserTokenService);
    
    if (process.env.PORT === undefined) {
      throw new Error('PORT is not defined');
    }
    
    server.post('/api/users/register', userController.register.bind(userController));
    server.post('/api/users/login', userController.login.bind(userController));
    
    server.register(
        swagger, withRefResolver({
            openapi: {
                info: {
                    title: "Authorization Server",
                    description: "API de Autenticação e Autorização",
                    version: "0.1.0",
                }
            }
        })
    );
    
    server.register(swaggerUI, {
        routePrefix: "/docs",
        staticCSP: true,
    });
    
    if (process.env.PORT === undefined) {
        throw new Error('PORT must be defined');
    }
    
    server.listen({
        port: parseInt(process.env.PORT),
        host: process.env.HOST,
    }, () => {
        console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
    });
}

main();