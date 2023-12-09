import { Injectable } from '@nestjs/common';
import { SecretProvider } from 'src/security/base/secret-provider/secret-provider.interface';
import * as crypto from 'crypto';

@Injectable()
export class SecretProviderService implements SecretProvider {
    async generateSecret(size: number): Promise<string> {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const randomBytes = crypto.randomBytes(size);
        const result = new Array(size);
      
        for (let i = 0; i < size; i++) {
          const byte = randomBytes[i];
          result[i] = characters[byte % characters.length];
        }
      
        return result.join('');
    }
}
