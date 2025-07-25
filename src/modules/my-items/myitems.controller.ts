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
  UseGuards,
  Request,
  ForbiddenException,
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

@ApiTags('MyItems')
@Controller('myitems')
@UseGuards(AuthGuard('jwt'), UserGuard)
@ApiBearerAuth()
export class MyItemsController {
  constructor(private readonly myitemsService: MyItemsService) {}

  @Get()
  @ApiOperation({ summary: '내 마이아이템 조회 (사용자)' })
  @ApiResponse({ status: 200, description: '조회 성공', type: [MyItem] })
  @ApiForbiddenResponse({ description: '사용자 권한이 필요합니다.' })
  async getMyItems(
    @Request()
    req,
  ): Promise<MyItem[]> {
    const userId = req.user.id;
    return this.myitemsService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '내 마이아이템 단일 조회 (사용자)' })
  @ApiResponse({ status: 201, description: '조회 성공', type: MyItem })
  @ApiForbiddenResponse({ description: '본인의 아이템만 조회할 수 있습니다.' })
  async getMyItem(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Request()
    req,
  ): Promise<MyItem | null> {
    const userId = req.user.id;
    const item = await this.myitemsService.findOne({ id });

    if (!item) {
      return null;
    }

    if (!item.user || item.user.id !== userId) {
      throw new ForbiddenException('본인의 아이템만 조회할 수 있습니다.');
    }

    return item;
  }

  @Post()
  @ApiOperation({ summary: '마이아이템 생성 (사용자)' })
  @ApiResponse({
    status: 201,
    description: '마이아이템 생성 성공',
    type: MyItem,
  })
  @ApiForbiddenResponse({ description: '사용자 권한이 필요합니다.' })
  async createMyItem(
    @Body()
    createMyitemDto: CreateMyItemDto,
    @Request()
    req,
  ): Promise<MyItem> {
    const userId = req.user.id;

    return this.myitemsService.create(createMyitemDto, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: '마이아이템 수정 (사용자)' })
  @ApiResponse({ status: 200, description: '수정 성공', type: MyItem })
  @ApiForbiddenResponse({ description: '본인의 아이템만 수정할 수 있습니다.' })
  async updateMyItem(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateMyitemDto: UpdateMyItemDto,
    @Request()
    req,
  ): Promise<MyItem | null> {
    const userId = req.user.id;
    const item = await this.myitemsService.findOne({ id });

    if (!item) {
      return null;
    }

    if (!item.user || item.user.id !== userId) {
      throw new ForbiddenException('본인의 아이템만 수정할 수 있습니다.');
    }

    return this.myitemsService.update({ id, updateMyitemDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: '마이아이템 삭제 (사용자)' })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  @ApiForbiddenResponse({ description: '본인의 아이템만 삭제할 수 있습니다.' })
  async deleteMyItem(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Request()
    req,
  ): Promise<boolean> {
    const userId = req.user.id;
    const item = await this.myitemsService.findOne({ id });

    if (!item) {
      return false;
    }

    if (!item.user || item.user.id !== userId) {
      throw new ForbiddenException('본인의 아이템만 삭제할 수 있습니다.');
    }

    return this.myitemsService.delete({ id });
  }
}
