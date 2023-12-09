import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProviderService {

    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    public getInstance(): PrismaClient {
        return this.prisma;
    }
}
