import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyItem } from './entities/myitem.entity';
import { MyItemsService } from './myitems.service';
import { MyItemsController } from './myitems.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MyItem])],
  controllers: [MyItemsController],
  providers: [MyItemsService],
})
export class MyItemsModule {}
