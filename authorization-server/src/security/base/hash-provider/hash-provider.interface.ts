export interface HashProvider {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export const HashProvider = Symbol("HashProvider");