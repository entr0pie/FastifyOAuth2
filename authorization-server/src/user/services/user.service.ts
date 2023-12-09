import { Inject, Injectable } from '@nestjs/common';
import { HashProvider } from 'src/security/base/hash-provider/hash-provider.interface';
import { PrismaProviderService } from 'src/database/prisma-provider/prisma-provider.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaProvider: PrismaProviderService,
        @Inject(HashProvider) private readonly hashProvider: HashProvider
    ) {}

    async findByEmail(email: string) {
        return await this.prismaProvider.getInstance().userModel.findUnique({
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

        const hashedPassword = await this.hashProvider.hashPassword(password);

        return await this.prismaProvider.getInstance().userModel.create({
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

        return await this.hashProvider.comparePassword(password, user.password);
    }   
}
