import { MyItemsService } from './myitems.service';
import { MyItem } from './entities/myitem.entity';
import { CreateMyItemDto } from './dto/create-myitem.dto';
import { UpdateMyItemDto } from './dto/update-myitem.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
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

  @Get(':id')
  @ApiOperation({ summary: '마이아이템 조회' })
  @ApiResponse({ status: 201, description: '조회 성공', type: MyItem })
  async getMyItem(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<MyItem | null> {
    return this.myitemsService.findOne({ id });
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
    createMyitemDto: CreateMyItemDto,
  ): Promise<MyItem> {
    return this.myitemsService.create({ createMyitemDto });
  }

  @Patch(':id')
  async updateMyItem(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateMyitemDto: UpdateMyItemDto,
  ): Promise<MyItem | null> {
    return this.myitemsService.update({ id, updateMyitemDto });
  }

  @Delete(':id')
  async deleteMyItem(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<boolean> {
    return this.myitemsService.delete({ id });
  }
}
