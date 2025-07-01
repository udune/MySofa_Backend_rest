import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceUpdate {
  productId: number;
  updateProductInput: UpdateProductInput;
}

export interface IProductsServiceDelete {
  productId: number;
}

export interface IProductsServiceExist {
  product: Product | null;
}

export interface IProductsServiceFindOne {
  productId: number;
}
