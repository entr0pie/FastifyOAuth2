import * as jose from 'jose';
import IOAuthTokenService from './oauth-token-service-interface';

export default class OAuthTokenService implements IOAuthTokenService {
  public algorithm: string = 'RS256';

  constructor(
    private privateKey: jose.KeyLike,
    private publicKey: jose.KeyLike,
  ) {}

  async createToken(email: string, client_id: string): Promise<string> {
    return await new jose.SignJWT({})
      .setProtectedHeader({ alg: this.algorithm, granted_by: email })
      .setIssuedAt()
      .setIssuer('authorization-server')
      .setAudience('resource-server')
      .setExpirationTime('2h')
      .setSubject(client_id)
      .sign(this.privateKey);
  }

  async verifyToken(token: string) {
    return await jose.jwtVerify(token, this.publicKey);
  }
}
