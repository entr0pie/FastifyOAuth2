import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt/bcrypt.service';
import { HashProvider } from '../base/hash-provider/hash-provider.interface';

@Module({
    providers: [{
        provide: HashProvider,
        useClass: BcryptService,
    }],
    exports: [HashProvider],
})
export class HashModule {}