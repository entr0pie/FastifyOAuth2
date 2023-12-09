import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaProviderService } from './services/prisma-provider/prisma-provider.service';
import { BcryptService } from './security/hash/bcrypt/bcrypt.service';
import { RS256KeyProvider } from './security/keys/key-provider/rs256-key-provider.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaProviderService,
    BcryptService,
    RS256KeyProvider,
  ],
})
export class AppModule {}
