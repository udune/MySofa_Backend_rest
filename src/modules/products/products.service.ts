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

  findOne({ id }: IProductsServiceFindOne): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
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
    id,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product | null> {
    const product = await this.findOne({ id });

    this.checkExist({ product });

    const update = { ...product, ...updateProductInput };

    return this.productRepository.save(update);
  }

  async delete({ id }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productRepository.softDelete({ id });
    return !!result.affected;
  }

  checkExist({ product }: IProductsServiceExist): void {
    if (!product) {
      throw new NotFoundException('product not found');
    }
  }
}
