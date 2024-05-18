import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';
import { TokenPayload } from '../types';

console.log('JWT_SECRET:', process.env.JWT_SECRET); // variavel de ambiente não está sendo reconhecida!!

export default class JWT {
  private static secret: Secret = 'jwt_secret';

  private static jwtConfig: SignOptions = {
    expiresIn: '4h',
    algorithm: 'HS256',
  };

  static sign(payload: TokenPayload): string {
    return sign({ ...payload }, this.secret, this.jwtConfig);
  }

  static async verify(token: string): Promise<string | TokenPayload> {
    try {
      return verify(token, this.secret) as TokenPayload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }

  static extractToken(authorization: string) {
    return authorization.split(' ')[1];
  }
}
