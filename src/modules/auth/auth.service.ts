import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceLoginResult,
} from './interfaces/auth-service.interface';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async login({
    email,
    password,
  }: IAuthServiceLogin): Promise<IAuthServiceLoginResult> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnprocessableEntityException('이메일 검증에 실패했습니다.');
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new UnprocessableEntityException('패스워드 검증에 실패했습니다.');
    }

    const accessToken = this.generateAccessToken({ user });
    const refreshToken = this.generateRefreshToken({ user });

    return {
      tokens: { accessToken, refreshToken },
      user,
    };
  }

  generateAccessToken({ user }: IAuthServiceGetAccessToken): string {
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    if (!secret) {
      throw new Error('JWT 액세스 토큰 시크릿이 없습니다.');
    }

    return this.jwtService.sign({ sub: user.id }, { secret, expiresIn: '1h' });
  }

  generateRefreshToken({ user }: IAuthServiceGetAccessToken): string {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    if (!secret) {
      throw new Error('JWT 리프레시 토큰 시크릿이 없습니다.');
    }

    return this.jwtService.sign({ sub: user.id }, { secret, expiresIn: '7d' });
  }

  async refreshAccessToken(userId: string): Promise<string> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 사용자입니다.');
    }

    return this.generateAccessToken({ user });
  }
}
