import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyItem } from './entities/myitem.entity';
import { Repository } from 'typeorm';
import {
  IMyItemsServiceCreate,
  IMyItemsServiceDelete,
  IMyItemsServiceExist,
  IMyItemsServiceFindOne,
  IMyItemsServiceUpdate,
} from './interfaces/myitems-service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class MyItemsService {
  constructor(
    @InjectRepository(MyItem)
    private readonly myitemRepository: Repository<MyItem>,
  ) {}

  async findAll(): Promise<MyItem[]> {
    return this.myitemRepository.find({
      relations: ['user', 'product'],
    });
  }

  async findOne({ myitemId }: IMyItemsServiceFindOne): Promise<MyItem | null> {
    return this.myitemRepository.findOne({
      where: { myitem_id: myitemId },
      relations: ['user', 'product'],
    });
  }

  create({ createMyitemInput }: IMyItemsServiceCreate): Promise<MyItem> {
    const result = this.myitemRepository.save({
      ...createMyitemInput,
    });

    return result;
  }

  async update({
    myitemId,
    updateMyitemInput,
  }: IMyItemsServiceUpdate): Promise<MyItem | null> {
    const myitem = await this.findOne({ myitemId });

    this.checkExist({ myitem });

    const update = { ...myitem, ...updateMyitemInput };

    return this.myitemRepository.save(update);
  }

  async delete({ myitemId }: IMyItemsServiceDelete): Promise<boolean> {
    const result = await this.myitemRepository.softDelete({
      myitem_id: myitemId,
    });
    return !!result.affected;
  }

  checkExist({ myitem }: IMyItemsServiceExist): void {
    if (!myitem) {
      throw new NotFoundException('myitem not found');
    }
  }
}
