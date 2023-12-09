import { Injectable } from '@nestjs/common';
import { HashProvider } from 'src/security/base/hash-provider/hash-provider.interface';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService implements HashProvider {

    private saltRounds: number = 10;

    async hashPassword(password: string): Promise<string> {
        return await hash(password, this.saltRounds);
    }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}