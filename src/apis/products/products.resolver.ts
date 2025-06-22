import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  fetchProduct(
    @Args('productId', { type: () => Int })
    productId: number,
  ): Promise<Product | null> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput')
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId', { type: () => Int })
    productId: number,
    @Args('updateProductInput')
    updateProductInput: UpdateProductInput,
  ): Promise<Product | null> {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('productId', { type: () => Int })
    productId: number,
  ): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
}
