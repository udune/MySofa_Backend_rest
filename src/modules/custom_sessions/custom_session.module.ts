import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomSession } from './entities/custom_session.entity';
import { CustomSessionService } from './custom_session.service';
import { CustomSessionController } from './custom_session.controller';
import { MyItem } from '../my-items/entities/myitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomSession, MyItem])],
  controllers: [CustomSessionController],
  providers: [CustomSessionService],
})
export class CustomSessionModule {}
