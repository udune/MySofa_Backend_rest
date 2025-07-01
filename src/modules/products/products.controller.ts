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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
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
  @ApiOperation({ summary: '상품 조회' })
  @ApiResponse({ status: 201, description: '상품 조회 성공', type: Product })
  async getProduct(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<Product | null> {
    return this.productsService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: '상품 등록' })
  @ApiResponse({ status: 201, description: '상품 등록 성공', type: Product })
  async createProduct(
    @Body()
    createProductInput: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    updateProductInput: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productsService.update({ id, updateProductInput });
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<boolean> {
    return this.productsService.delete({ id });
  }
}
