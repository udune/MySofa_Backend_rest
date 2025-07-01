import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomSession } from './entities/custom_session.entity';
import { CustomSessionService } from './custom_session.service';
import { CustomSessionController } from './custom_session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomSession])],
  controllers: [CustomSessionController],
  providers: [CustomSessionService],
})
export class CustomSessionModule {}
