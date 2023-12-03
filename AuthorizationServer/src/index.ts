// API e JWT
import Fastify from 'fastify'
import fjwt from "@fastify/jwt"

// Swagger Documentation
import { withRefResolver } from "fastify-zod"
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import dotenv from 'dotenv'
dotenv.config()

// Iniciar Fastify
export const server = Fastify()

// Autenticação JWT (Base - Importa do Fastify JWT)
// Ref. https://www.nearform.com/blog/uncovering-secrets-in-fastify/
server.register(fjwt, {
    secret: String(process.env.JWT_SECRET),
});

// Async: Rodar o Ap Main.
async function main() {
    // Documentação do Swagger
    // 1. Definir os Dados e Schemas
    server.register(
        swagger, withRefResolver ({
            openapi: {
                info: {
                    title: "Authorization Server",
                    description: "API de Autenticação e Autorização",
                    version: "0.1.0",
                }
            }
        })
    )
    // 2. Criar a Rota de Documentação
    server.register(swaggerUI, {
        routePrefix: "/docs",
        staticCSP: true,
    })
}

if (process.env.PORT === undefined) {
    throw new Error('PORT must be defined')
}

server.listen({port: parseInt(process.env.PORT)}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
});

