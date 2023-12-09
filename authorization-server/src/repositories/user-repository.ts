import { PrismaClient } from "@prisma/client";
import HashingService from "../services/security/hashing/hashing-service";

export default class UserRepository {

    constructor(
        private prisma: PrismaClient,
        private hashingService: HashingService
    ) {}

    async findByEmail(email: string) {
        return await this.prisma.userModel.findUnique({
            where: {
                email: email
            }
        });
    }

    async register(email: string, password: string) {
        const user = await this.findByEmail(email);
        if (user) {
            throw new Error('Email already exists')
        }

        const hashedPassword = await this.hashingService.hashPassword(password);

        return await this.prisma.userModel.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });
    }

    async checkCredentials(email: string, password: string) {
        const user = await this.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        return await this.hashingService.comparePassword(password, user.password);
    }   
}