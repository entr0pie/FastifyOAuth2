import { Module } from '@nestjs/common';
import { RS256KeyProvider } from './key-provider/rs256-key-provider.service';
import { KeyProvider } from '../base/key-provider/key-provider.interface';

@Module({
    providers: [{
        provide: KeyProvider,
        useClass: RS256KeyProvider,
    }],
    exports: [KeyProvider],
})
export class KeysModule {}
