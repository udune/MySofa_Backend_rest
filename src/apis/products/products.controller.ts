import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
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

  @Get(':productId')
  @ApiOperation({ summary: '상품 조회' })
  @ApiResponse({ status: 201, description: '상품 조회 성공', type: Product })
  async getProduct(
    @Param('productId', ParseIntPipe)
    productId: number,
  ): Promise<Product | null> {
    return this.productsService.findOne({ productId });
  }

  @Post()
  @ApiOperation({ summary: '상품 등록' })
  @ApiResponse({ status: 201, description: '상품 등록 성공', type: Product })
  async createProduct(
    @Body()
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }

  @Patch(':productId')
  updateProduct(
    @Param('productId', ParseIntPipe)
    productId: number,
    @Body()
    updateProductInput: UpdateProductInput,
  ): Promise<Product | null> {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Delete(':productId')
  async deleteProduct(
    @Param('productId', ParseIntPipe)
    productId: number,
  ): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
}
