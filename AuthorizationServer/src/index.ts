// API e JWT
import Fastify from 'fastify'
import fjwt from "@fastify/jwt"

// Swagger Documentation
import {withRefResolver} from "fastify-zod"
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";


import dotenv from 'dotenv'

dotenv.config()

// Prisma - ORM (Operações de Client, Disconnect, etc)
import {PrismaClient} from "@prisma/client";
import {hostname} from "os";

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
        swagger, withRefResolver({
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

    // 3. Definir as Rotas
    // TODO: Criar as rotas.
    // server.register(aplicacoesRoutes, {prefix: "/api/aplicacoes"})
    // server.register(usuariosRoutes, {prefix: "/api/usuarios"})

    // 4. Registrar o Prisma e Tentar Iniciar o Servidor.
    const prisma = new PrismaClient();
    server.decorate("prisma", prisma); // Decorator: Adicionar o Prisma ao Fastify.

    // Com o Prisma Injetado no Fastify, vamos iniciar o Server.
    try {
        // Definir de tal forma que não dê o `await` error.
        // Usando o formato não depreciado:
        // listen(opts?: FastifyListenOptions): Promise<string>;
        // ParseInt no Process.Env.Port pra não dar o erro "TS2769: No overload matches this call."
        server.listen({
                // Parse Int do String no `.env`... Evita o erro de "TS2769: No overload matches this call."
                port: process.env.PORT ? parseInt(process.env.PORT) : parseInt(process.env.PORT as string),
                host: process.env.HOST,
                // O Callback é chamado fora do escopo dessas chaves, que defini `port` e `host`.
            },
            () => {
                console.log(`Listening on ${process.env.HOST}:${process.env.PORT}`);
            })
    } catch (e) {
    }
}

if (process.env.PORT === undefined) {
    throw new Error('PORT must be defined')
}

// Executar o Servidor com o `Main()`.
main()
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
