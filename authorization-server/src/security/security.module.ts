import { Module } from '@nestjs/common';
import { BcryptService } from './hash/bcrypt/bcrypt.service';
import { RS256KeyProvider } from './keys/key-provider/rs256-key-provider.service';
import { HashModule } from './hash/hash.module';
import { KeysModule } from './keys/keys.module';
import { SecretProviderService } from './secret/secret-provider/secret-provider.service';
import { SecretModule } from './secret/secret.module';

@Module({
    exports: [HashModule, KeysModule, SecretModule],
    imports: [HashModule, KeysModule, SecretModule],
    providers: [],
})
export class SecurityModule {}