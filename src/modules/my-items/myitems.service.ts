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

  async findOne({ id }: IMyItemsServiceFindOne): Promise<MyItem | null> {
    return this.myitemRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
  }

  create({ createMyitemDto }: IMyItemsServiceCreate): Promise<MyItem> {
    const result = this.myitemRepository.save({
      ...createMyitemDto,
    });

    return result;
  }

  async update({
    id,
    updateMyitemDto,
  }: IMyItemsServiceUpdate): Promise<MyItem | null> {
    const myitem = await this.findOne({ id });

    this.checkExist({ myitem });

    const update = { ...myitem, ...updateMyitemDto };

    return this.myitemRepository.save(update);
  }

  async delete({ id }: IMyItemsServiceDelete): Promise<boolean> {
    const result = await this.myitemRepository.softDelete({
      id,
    });
    return !!result.affected;
  }

  checkExist({ myitem }: IMyItemsServiceExist): void {
    if (!myitem) {
      throw new NotFoundException('myitem not found');
    }
  }
}
