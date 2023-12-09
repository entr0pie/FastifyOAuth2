import JWTVerifierService from '../jwt-service';

export default interface IOAuthTokenService extends JWTVerifierService {
  createToken(email: string, client_id: string): Promise<string>;
}
