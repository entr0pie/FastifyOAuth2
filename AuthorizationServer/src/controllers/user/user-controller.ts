import { FastifyReply, FastifyRequest } from "fastify";
import UserRepository from "../../repositories/user-repository";
import RegisterRequest from "./messages/register-request";

export default class UserController {
    constructor(
        private userRepository: UserRepository
    ) {}

    async register(request: FastifyRequest<{Body: RegisterRequest}>, reply: FastifyReply) {
        const email: string = request.body.email;
        const password: string = request.body.password;

        try {
            await this.userRepository.register(email, password);
            reply.code(201).send();
        } catch (error) {
            reply.code(400).send({
                statusCode: 400,
                error: 'Bad Request'
            });
        }
    }

    async login(request: FastifyRequest<{Body: RegisterRequest}>, reply: FastifyReply) {
        const email: string = request.body.email;
        const password: string = request.body.password;

        try {
            if (await this.userRepository.checkCredentials(email, password)) {
                reply.code(200).send();
            }

            reply.code(401).send({
                statusCode: 401,
                error: 'Unauthorized'
            });
            
        } catch (error) {
            reply.code(400).send({
                statusCode: 400,
                error: 'Bad Request'
            });
        }
    }

    
}