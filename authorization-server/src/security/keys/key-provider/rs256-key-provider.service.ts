import { Injectable } from '@nestjs/common';
import { GenerateKeyPairResult, KeyLike } from 'jose';
import { KeyProvider } from 'src/security/base/key-provider/key-provider.interface';
import * as jose from 'jose';

@Injectable()
export class RS256KeyProvider implements KeyProvider {
  async generateKeyPair(): Promise<GenerateKeyPairResult<KeyLike>> {
    return await jose.generateKeyPair('RS256', { modulusLength: 2048 });
  }
}
