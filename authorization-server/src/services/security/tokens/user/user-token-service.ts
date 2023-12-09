import IUserTokenService from "./user-token-service-interface";
import * as jose from 'jose';

export default class UserTokenService implements IUserTokenService {

    public algorithm: string = 'RS256';

    constructor(
        private privateKey: jose.KeyLike,
        private publicKey: jose.KeyLike
    ) {}

    async createToken(email: string) {
        return await new jose.SignJWT({})
                        .setProtectedHeader({ alg: this.algorithm })
                        .setIssuedAt()
                        .setIssuer('resource-server')
                        .setExpirationTime('2h')
                        .setSubject(email)
                        .sign(this.privateKey);
    }

    async verifyToken(token: string) {
        return await jose.jwtVerify(token, this.publicKey);
    }
}
