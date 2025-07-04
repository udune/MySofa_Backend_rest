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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('CustomSession')
@Controller('custom-session')
export class CustomSessionController {
  constructor(private readonly customSessionService: CustomSessionService) {}

  @Get(':sessionId')
  @ApiOperation({ summary: '세션 조회' })
  @ApiResponse({
    status: 200,
    description: '세션 조회 성공',
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
  @ApiResponse({
    status: 201,
    description: '세션 저장 성공',
    type: CustomSession,
  })
  createCustomSession(
    @Body()
    body: {
      userId: number;
      productId: number;
      createCustomSessionInput: CreateCustomSessionDto;
    },
  ): Promise<CustomSession | null> {
    const { userId, productId, createCustomSessionInput } = body;

    const user = { user_id: userId } as any;
    const product = { product_id: productId } as any;

    return this.customSessionService.create({
      createCustomSessionInput,
      user,
      product,
    });
  }
}
