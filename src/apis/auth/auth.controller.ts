/* eslint-disable @typescript-eslint/require-await */
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IAuthServiceTokens } from './interfaces/auth-service.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.',
  })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiBadRequestResponse({ description: '로그인 실패' })
  async login(
    @Body() loginInput: LoginInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { email, password } = loginInput;
      const tokens: IAuthServiceTokens = await this.authService.login({
        email,
        password,
      });

      this.setAuthCookies(res, tokens);

      return { message: '로그인 성공', accessToken: tokens.accessToken };
    } catch (error) {
      throw new BadRequestException(
        '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      );
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃하고 쿠키를 삭제합니다.',
  })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { message: '로그아웃되었습니다.' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('refresh'))
  @ApiOperation({
    summary: '토큰 갱신',
    description: '리프레시 토큰으로 액세스 토큰을 갱신합니다.',
  })
  @ApiResponse({ status: 200, description: '토큰 갱신 성공' })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 리프레시 토큰' })
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = req.user as { userId: number; refreshToken: string };
      const newAccessToken = await this.authService.refreshAccessToken(
        user.userId,
      );
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
      });

      return {
        message: 'Access Token이 갱신되었습니다.',
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new BadRequestException(
        'Refresh Token이 유효하지 않거나 만료되었습니다.',
      );
    }
  }

  private setAuthCookies(res: Response, tokens: IAuthServiceTokens) {
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 604800000,
    });
  }
}
