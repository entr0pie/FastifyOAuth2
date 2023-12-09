import { FastifyReply, FastifyRequest } from "fastify";
import UserRepository from "../../repositories/user-repository";
import RegisterRequest from "./messages/register-request";
import IUserTokenService from "../../services/security/tokens/user/user-token-service-interface";

export default class UserController {
    constructor(
        private userRepository: UserRepository,
        private jwtUserTokenService: IUserTokenService
    ) {}

    async register(request: FastifyRequest<{Body: RegisterRequest}>, reply: FastifyReply) {
        const email: string = request.body.email;
        const password: string = request.body.password;

        try {
            await this.userRepository.register(email, password);
            reply.code(201).send();
        } catch (error) {
            reply.code(400).send();
        }
    }

    async login(request: FastifyRequest<{Body: RegisterRequest}>, reply: FastifyReply) {
        const email: string = request.body.email;
        const password: string = request.body.password;

        try {
            if (await this.userRepository.checkCredentials(email, password)) {
                const token = await this.jwtUserTokenService.createToken(email);
                reply.code(200).send({ access_token: token });
            }

            reply.code(401).send({
                error: 'Unauthorized'
            });
            
        } catch (error) {
            reply.code(400).send();
        }
    }

    
}