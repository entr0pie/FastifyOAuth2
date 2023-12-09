import { Module } from '@nestjs/common';
import { SecretProvider } from '../base/secret-provider/secret-provider.interface';
import { SecretProviderService } from './secret-provider/secret-provider.service';

@Module({
    providers: [
        {
            provide: SecretProvider,
            useClass: SecretProviderService
        }
    ],
    exports: [SecretProvider],
})
export class SecretModule {}
