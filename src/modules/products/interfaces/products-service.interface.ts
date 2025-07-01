import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export interface IProductsServiceCreate {
  createProductInput: CreateProductDto;
}

export interface IProductsServiceUpdate {
  id: string;
  updateProductInput: UpdateProductDto;
}

export interface IProductsServiceDelete {
  id: string;
}

export interface IProductsServiceExist {
  product: Product | null;
}

export interface IProductsServiceFindOne {
  id: string;
}
