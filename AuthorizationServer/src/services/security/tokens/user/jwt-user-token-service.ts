import UserTokenService from "./user-token-service";
import * as jose from 'jose';

export default class JWTUserTokenService implements UserTokenService {

    public algorithm: string = 'RS256';

    constructor(
        private privateKey: jose.KeyLike,
        private publicKey: jose.KeyLike
    ) {}

    async createToken(email: string): Promise<string> {
        return await new jose.SignJWT({})
                        .setProtectedHeader({ alg: this.algorithm })
                        .setIssuedAt()
                        .setIssuer('resource-server')
                        .setExpirationTime('2h')
                        .setSubject(email)
                        .sign(this.privateKey);
    }

    async verifyToken(token: string): Promise<boolean> {
        try {
            const payload = jose.jwtVerify(token, this.publicKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}
