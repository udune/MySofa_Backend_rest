import { MyItemsService } from './myitems.service';
import { MyItem } from './entities/myitem.entity';
import { CreateMyItemInput } from './dto/create-myitem.input';
import { UpdateMyItemInput } from './dto/update-myitem.input';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('MyItems')
@Controller('myitems')
export class MyItemsController {
  constructor(private readonly myitemsService: MyItemsService) {}

  @Get()
  @ApiOperation({ summary: '전체 마이아이템 조회' })
  @ApiResponse({ status: 201, description: '조회 성공', type: [MyItem] })
  async getMyItems(): Promise<MyItem[]> {
    return this.myitemsService.findAll();
  }

  @Get(':myitemId')
  @ApiOperation({ summary: '마이아이템 조회' })
  @ApiResponse({ status: 201, description: '조회 성공', type: MyItem })
  async getMyItem(
    @Param('myitemId', ParseIntPipe)
    myitemId: number,
  ): Promise<MyItem | null> {
    return this.myitemsService.findOne({ myitemId });
  }

  @Post()
  @ApiOperation({ summary: '마이아이템 생성' })
  @ApiResponse({
    status: 201,
    description: '마이아이템 생성 성공',
    type: MyItem,
  })
  async createMyItem(
    @Body()
    createMyitemInput: CreateMyItemInput,
  ): Promise<MyItem> {
    return this.myitemsService.create({ createMyitemInput });
  }

  @Patch(':myitemId')
  async updateMyItem(
    @Param('myitemId', ParseIntPipe)
    myitemId: number,
    @Body()
    updateMyitemInput: UpdateMyItemInput,
  ): Promise<MyItem | null> {
    return this.myitemsService.update({ myitemId, updateMyitemInput });
  }

  @Delete(':myitemId')
  async deleteMyItem(
    @Param('myitemId', ParseIntPipe)
    myitemId: number,
  ): Promise<boolean> {
    return this.myitemsService.delete({ myitemId });
  }
}
