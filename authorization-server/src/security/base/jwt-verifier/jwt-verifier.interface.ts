import * as jose from 'jose';

export interface JWTVerifier {
  verifyToken(
    token: string,
  ): Promise<jose.JWTVerifyResult<jose.JWTPayload> | null>;
}
