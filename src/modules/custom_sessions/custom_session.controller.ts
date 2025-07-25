import { CustomSessionService } from './custom_session.service';
import { CustomSession } from './entities/custom_session.entity';
import { CreateCustomSessionDto } from './dto/create-custom_session.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '@/src/common/guards/user.guard';

@ApiTags('CustomSession')
@Controller('custom-session')
export class CustomSessionController {
  constructor(private readonly customSessionService: CustomSessionService) {}

  @Get(':sessionId')
  @ApiOperation({ summary: '커스텀 세션 조회' })
  @ApiResponse({
    status: 200,
    description: '커스텀 세션 조회 성공',
    type: CustomSession,
  })
  getCustomSession(
    @Param('sessionId', ParseUUIDPipe)
    sessionId: string,
  ): Promise<CustomSession | null> {
    return this.customSessionService.findOneBySessionId({ sessionId });
  }

  @Post()
  @ApiOperation({ summary: '커스텀 세션 생성 또는 수정' })
  @UseGuards(AuthGuard('jwt'), UserGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: '세션 저장 성공',
    type: CustomSession,
  })
  @ApiForbiddenResponse({ description: '사용자 권한이 필요합니다.' })
  createCustomSession(
    @Body()
    createCustomSessionDto: CreateCustomSessionDto,
  ): Promise<CustomSession | null> {
    return this.customSessionService.create({
      createCustomSessionDto,
    });
  }
}
