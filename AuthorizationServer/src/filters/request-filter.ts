import { FastifyReply, FastifyRequest } from "fastify";

export interface RequestFilter {
    doFilter(request: FastifyRequest, reply: FastifyReply, done: any): Promise<void>;
}