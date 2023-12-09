import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { UserTokenService } from './security/user-token/user-token.service';
import { HashModule } from 'src/security/hash/hash.module';
import { KeysModule } from 'src/security/keys/keys.module';
import { DatabaseModule } from 'src/database/database.module';
import { IUserTokenService } from './security/user-token/interface/user-token-service.interface';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: IUserTokenService,
      useClass: UserTokenService,
    },
  ],
  imports: [HashModule, KeysModule, DatabaseModule],
})
export class UserModule {}
