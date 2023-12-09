import HashingService from './hashing-service';
import bcrypt from 'bcrypt';

export default class BcryptService implements HashingService {
  constructor(private saltRounds: number) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
