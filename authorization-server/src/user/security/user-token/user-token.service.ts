import { Injectable } from '@nestjs/common';
import { IUserTokenService } from './interface/user-token-service.interface';
import { JWTVerifyResult, JWTPayload } from 'jose';
import * as jose from 'jose';
import { KeyProvider } from 'src/security/base/key-provider/key-provider.interface';

@Injectable()
export class UserTokenService implements IUserTokenService {

    public algorithm: string = 'RS256';
    public publicKey: jose.KeyLike;
    private privateKey: jose.KeyLike;

    constructor(
        private keyProvider: KeyProvider
    ) {
        this.keyProvider.generateKeyPair()
            .then((result) => {
                this.publicKey = result.publicKey;
                this.privateKey = result.privateKey;
            });
    }

    async createToken(email: string): Promise<string> {
        return await new jose.SignJWT({})
                        .setProtectedHeader({ alg: this.algorithm })
                        .setIssuedAt()
                        .setIssuer('resource-server')
                        .setExpirationTime('2h')
                        .setSubject(email)
                        .sign(this.privateKey);
    }
    async verifyToken(token: string): Promise<JWTVerifyResult<JWTPayload>> {
        return await jose.jwtVerify(token, this.publicKey);
    }

}
