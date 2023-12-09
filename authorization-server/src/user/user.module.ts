import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { UserTokenService } from './security/user-token/user-token.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserTokenService],
})
export class UserModule {}
