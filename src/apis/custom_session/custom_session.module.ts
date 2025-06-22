import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomSession } from './entities/custom_session.entity';
import { CustomSessionService } from './custom_session.service';
import { CustomSessionResolver } from './custom_session.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CustomSession])],
  providers: [CustomSessionService, CustomSessionResolver],
})
export class CustomSessionModule {}
