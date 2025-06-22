import { Args, Query, Mutation, Resolver, Int } from '@nestjs/graphql';
import { MyItemsService } from './myitems.service';
import { MyItem } from './entities/myitem.entity';
import { CreateMyItemInput } from './dto/create-myitem.input';
import { UpdateMyItemInput } from './dto/update-myitem.input';

@Resolver(() => MyItem)
export class MyItemsResolver {
  constructor(private readonly myitemsService: MyItemsService) {}

  @Query(() => [MyItem])
  fetchMyItems(): Promise<MyItem[]> {
    return this.myitemsService.findAll();
  }

  @Query(() => MyItem, { nullable: true })
  fetchMyItem(
    @Args('myitemId', { type: () => Int })
    myitemId: number,
  ): Promise<MyItem | null> {
    return this.myitemsService.findOne({ myitemId });
  }

  @Mutation(() => MyItem)
  createMyItem(
    @Args('createMyitemInput')
    createMyitemInput: CreateMyItemInput,
  ): Promise<MyItem> {
    return this.myitemsService.create({ createMyitemInput });
  }

  @Mutation(() => MyItem)
  async updateMyItem(
    @Args('myitemId', { type: () => Int })
    myitemId: number,
    @Args('updateMyitemInput')
    updateMyitemInput: UpdateMyItemInput,
  ): Promise<MyItem | null> {
    return this.myitemsService.update({ myitemId, updateMyitemInput });
  }

  @Mutation(() => Boolean)
  async deleteMyItem(
    @Args('myitemId', { type: () => Int })
    myitemId: number,
  ): Promise<boolean> {
    return this.myitemsService.delete({ myitemId });
  }
}
