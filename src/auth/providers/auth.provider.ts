import * as argon from 'argon2';

export class AuthProvider {
  static hash(password: string): Promise<string> {
    return argon.hash(password);
  }

  static verify(hash: string, password: string): Promise<boolean> {
    return argon.verify(hash, password);
  }
}
