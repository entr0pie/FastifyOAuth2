import JWTVerifierService from '../jwt-service';

export default interface IUserTokenService extends JWTVerifierService {
  createToken(email: string): Promise<string>;
}
