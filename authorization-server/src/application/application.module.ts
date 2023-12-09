import { Module } from '@nestjs/common';
import { ApplicationController } from './controller/application.controller';
import { UserModule } from 'src/user/user.module';
import { ApplicationService } from './services/application.service';
import { SecretModule } from 'src/security/secret/secret.module';

@Module({
  controllers: [ApplicationController],
  imports: [UserModule, SecretModule],
  providers: [ApplicationService],
})
export class ApplicationModule {}
