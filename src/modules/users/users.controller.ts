import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 유저를 등록합니다.',
  })
  @ApiResponse({ status: 201, description: '회원가입 성공', type: User })
  @ApiBadRequestResponse({ description: '이메일 형식 오류' })
  @ApiConflictResponse({ description: '이미 가입된 이메일' })
  async createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(createUserDto);
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

  @Get(':id')
  @ApiOperation({
    summary: '특정 유저 조회',
    description: 'ID로 특정 유저 정보를 조회합니다.',
  })
  @ApiParam({ name: 'id', description: '유저ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: '유저 조회 성공',
    type: User,
  })
  @ApiNotFoundResponse({ description: '유저를 찾을수 없음' })
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
