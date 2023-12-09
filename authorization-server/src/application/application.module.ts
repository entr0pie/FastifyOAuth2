import { Module } from '@nestjs/common';
import { ApplicationController } from './controller/application.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ApplicationController],
  imports: [UserModule],
})
export class ApplicationModule {}
