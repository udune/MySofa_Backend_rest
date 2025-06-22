import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import {
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceExist,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['myitems'] });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { product_id: productId },
      relations: ['myitems'],
    });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...createProductInput,
    });

    return this.productRepository.save(newProduct);
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product | null> {
    const product = await this.findOne({ productId });

    this.checkExist({ product });

    const update = { ...product, ...updateProductInput };

    return this.productRepository.save(update);
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productRepository.softDelete({
      product_id: productId,
    });
    return !!result.affected;
  }

  checkExist({ product }: IProductsServiceExist): void {
    if (!product) {
      throw new NotFoundException('product not found');
    }
  }
}
