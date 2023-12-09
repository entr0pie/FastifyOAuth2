import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SecurityModule } from './security/security.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, SecurityModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
