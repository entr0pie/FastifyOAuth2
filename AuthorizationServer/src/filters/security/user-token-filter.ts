import { FastifyReply, FastifyRequest } from "fastify";
import IUserTokenService from "../../services/security/tokens/user/user-token-service-interface";
import { RequestFilter } from "../request-filter";

export default class UserTokenFilter implements RequestFilter {
    constructor(
        private userTokenService: IUserTokenService
    ) {}

    async doFilter(request: FastifyRequest, reply: FastifyReply, done: any) {
        const token = request.headers["authorization"] as string;
        try {
            const userToken = await this.userTokenService.verifyToken(token);
        } catch (error) {
            reply.status(401).send({ message: "Unauthorized" });
            return;
        }

        done();
    }
}