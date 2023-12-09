import * as jose from 'jose';

export interface KeyProvider {
  generateKeyPair(): Promise<jose.GenerateKeyPairResult>;
}
