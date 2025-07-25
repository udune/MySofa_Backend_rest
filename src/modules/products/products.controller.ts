import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../common/guards/admin.guard';
import { UserGuard } from '@/src/common/guards/user.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 조회' })
  @ApiOperation({ summary: '전체 상품 조회' })
  @ApiResponse({
    status: 201,
    description: '상품 목록 조회 성공',
    type: [Product],
  })
  async getProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 조회' })
  @ApiResponse({ status: 201, description: '상품 조회 성공', type: Product })
  @ApiForbiddenResponse({ description: '사용자 권한이 필요합니다.' })
  async getProduct(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<Product | null> {
    return this.productsService.findOne({ id });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 등록 (관리자)' })
  @ApiResponse({ status: 201, description: '상품 등록 성공', type: Product })
  @ApiForbiddenResponse({ description: '관리자 권한이 필요합니다.' })
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create({ createProductDto });
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 수정 (관리자)' })
  @ApiResponse({ status: 200, description: '수정 성공', type: Product })
  @ApiForbiddenResponse({ description: '관리자 권한이 필요합니다.' })
  updateProduct(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productsService.update({ id, updateProductDto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '상품 삭제 (관리자)' })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  @ApiForbiddenResponse({ description: '관리자 권한이 필요합니다.' })
  async deleteProduct(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<boolean> {
    return this.productsService.delete({ id });
  }
}
