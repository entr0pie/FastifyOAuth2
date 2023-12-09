import { Inject, Injectable } from '@nestjs/common';
import { ApplicationModel } from '@prisma/client';
import { PrismaProviderService } from 'src/database/prisma-provider/prisma-provider.service';
import { SecretProvider } from 'src/security/base/secret-provider/secret-provider.interface';

@Injectable()
export class ApplicationService {

    private prisma = this.prismaProvider.getInstance();
    private secretSize = 16;

    constructor(
        private readonly prismaProvider: PrismaProviderService,
        @Inject(SecretProvider) private readonly secretProvider: SecretProvider,
    ) {}

    async findById(id: string): Promise<ApplicationModel> {
        return await this.prisma.applicationModel.findUnique({
            where: {
                id: id,
            },
        });
    }
    
    async getByOwner(ownerId: string): Promise<ApplicationModel[]> {
        return await this.prisma.applicationModel.findMany({
            where: {
                owner: ownerId,
                },
            });
    }

    async getByClientId(client_id: string): Promise<ApplicationModel> {
        return await this.prisma.applicationModel.findUnique({
            where: {
                client_id: client_id,
            },
        });
    }

    async create(client_id: string, redirect_url: string, ownerId: string): Promise<ApplicationModel> {
        const app = await this.getByClientId(client_id);
        
        if (app) {
            throw new Error('Application already exists');
        }

        const client_secret = await this.secretProvider.generateSecret(this.secretSize);

        return await this.prisma.applicationModel.create({
            data: {
                client_id: client_id,
                client_secret: client_secret,
                redirect_url: redirect_url,
                owner: ownerId,
            },
        });
        
    }

    async update(old_client_id: string, client_id: string, redirect_url: string, ownerId: string): Promise<ApplicationModel> {
        const client_secret = await this.secretProvider.generateSecret(this.secretSize);

        return await this.prisma.applicationModel.update({
            where: {
                client_id: old_client_id,
            },
            data: {
                client_id: client_id,
                client_secret: client_secret,
                redirect_url: redirect_url,
                owner: ownerId,
            },
        });
    }

    async delete(client_id: string): Promise<ApplicationModel> {
        return await this.prisma.applicationModel.delete({
            where: {
                client_id: client_id,
            },
        });
    }
}
