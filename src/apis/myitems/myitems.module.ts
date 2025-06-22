import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyItem } from './entities/myitem.entity';
import { MyItemsService } from './myitems.service';
import { MyItemsResolver } from './myitems.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MyItem])],
  providers: [MyItemsService, MyItemsResolver],
})
export class MyItemsModule {}
