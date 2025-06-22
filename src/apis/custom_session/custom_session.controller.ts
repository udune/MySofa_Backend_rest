import { CustomSessionService } from './custom_session.service';
import { CustomSession } from './entities/custom_session.entity';
import { CreateCustomSessionInput } from './dto/create-custom_session.input';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('custom-session')
export class CustomSessionController {
  constructor(private readonly customSessionService: CustomSessionService) {}

  @Get(':sessionId')
  getCustomSession(
    @Param('sessionId', ParseIntPipe)
    sessionId: number,
  ): Promise<CustomSession | null> {
    return this.customSessionService.findOneBySessionId({ sessionId });
  }

  @Post()
  createCustomSession(
    @Body()
    body: {
      userId: number;
      productId: number;
      createCustomSessionInput: CreateCustomSessionInput;
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
