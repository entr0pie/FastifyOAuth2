export interface SecretProvider {
    generateSecret(size: number): Promise<string>;
}

export const SecretProvider = Symbol('SecretProvider');