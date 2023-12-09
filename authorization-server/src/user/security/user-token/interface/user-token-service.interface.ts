import { JWTVerifier } from 'src/security/base/jwt-verifier/jwt-verifier.interface';

export interface IUserTokenService extends JWTVerifier {
  createToken(email: string): Promise<string>;
}
