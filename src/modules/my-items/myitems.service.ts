/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Injectable,
  NotFoundException,
  Scope,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyItem } from './entities/myitem.entity';
import { Repository } from 'typeorm';
import {
  IMyItemsServiceDelete,
  IMyItemsServiceExist,
  IMyItemsServiceFindOne,
  IMyItemsServiceUpdate,
} from './interfaces/myitems-service.interface';
import { CreateMyItemDto } from './dto/create-myitem.dto';

@Injectable({ scope: Scope.DEFAULT })
export class MyItemsService {
  constructor(
    @InjectRepository(MyItem)
    private readonly myitemRepository: Repository<MyItem>,
  ) {}

  async findByUserId(userId: string): Promise<MyItem[]> {
    return this.myitemRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'product'],
      select: {
        id: true,
        name: true,
        custom_name: true,
        color: true,
        material: true,
        size: true,
        model_type: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        user: {
          id: true,
          nickname: true,
        },
        product: {
          id: true,
          name: true,
          custom_name: true,
        },
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne({ id }: IMyItemsServiceFindOne): Promise<MyItem | null> {
    return this.myitemRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
      select: {
        id: true,
        name: true,
        custom_name: true,
        color: true,
        material: true,
        size: true,
        model_type: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        user: {
          id: true,
          nickname: true,
        },
        product: {
          id: true,
          name: true,
          custom_name: true,
        },
      },
    });
  }

  async create(createMyitemDto: CreateMyItemDto): Promise<MyItem> {
    const { user_id, product_id, ...itemData } = createMyitemDto;

    // 1. 사용자당 최대 아이템 수 확인 (예: 100개 제한)
    const userItemCount = await this.myitemRepository.count({
      where: { user: { id: user_id } },
    });

    if (userItemCount >= 5) {
      throw new BadRequestException(
        '사용자당 최대 5개의 마이아이템만 생성할 수 있습니다.',
      );
    }

    return this.myitemRepository.save({
      ...itemData,
      user: { id: user_id } as any,
      product: { id: product_id } as any,
    });
  }

  async update({
    id,
    updateMyitemDto,
  }: IMyItemsServiceUpdate): Promise<MyItem | null> {
    const myitem = await this.findOne({ id });

    this.checkExist({ myitem });

    const { user_id, product_id, ...itemData } = updateMyitemDto as any;

    const updateData: any = { ...itemData };
    if (user_id) {
      updateData.user = { id: user_id };
    }
    if (product_id) {
      updateData.product = { id: product_id };
    }

    const update = { ...myitem, ...updateData };

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
      throw new NotFoundException('마이아이템을 찾을 수 없습니다.');
    }
  }
}
