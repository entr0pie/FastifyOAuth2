import * as jose from 'jose';

export default interface JWTVerifierService {
    verifyToken(token: string): Promise<jose.JWTVerifyResult<jose.JWTPayload> | null>;
};