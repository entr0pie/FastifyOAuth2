export default interface UserTokenService {
    createToken(email: string): Promise<string>;
    verifyToken(token: string): Promise<boolean>;
}; 