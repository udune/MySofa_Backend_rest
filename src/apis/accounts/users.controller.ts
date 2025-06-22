import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { EmailService } from './email.service';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 유저를 등록합니다.',
  })
  @ApiResponse({ status: 201, description: '회원가입 성공', type: User })
  @ApiBadRequestResponse({ description: '이메일 형식 오류' })
  @ApiConflictResponse({ description: '이미 가입된 이메일' })
  async createUser(
    @Body()
    createUserInput: CreateUserInput,
  ): Promise<User> {
    const { email, nickname } = createUserInput;
    if (!this.emailService.checkEmailFormat(email)) {
      throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
    }

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    const newUser = await this.usersService.create(createUserInput);
    await this.emailService.sendWelcomeEmail(email, nickname);
    return newUser;
  }

  @Get()
  @ApiOperation({
    summary: '전체 유저 조회',
    description: '모든 유저 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '유저 목록 조회 성공',
    type: [User],
  })
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
