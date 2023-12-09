import { Module } from '@nestjs/common';
import { BcryptService } from './hash/bcrypt/bcrypt.service';
import { RS256KeyProvider } from './keys/key-provider/rs256-key-provider.service';
import { HashModule } from './hash/hash.module';
import { KeysModule } from './keys/keys.module';

@Module({
    exports: [HashModule, KeysModule],
    imports: [HashModule, KeysModule],
})
export class SecurityModule {}