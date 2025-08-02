import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ICustomSessionServiceCreate,
  ICustomSessionServiceCreateFromMyItem,
  ICustomSessionServiceFindOneBySessionId,
  ICustomSessionServiceFindOneByUserId,
} from './interfaces/custom_session.interface';
import { CustomSession } from './entities/custom_session.entity';
import { MyItem } from '../my-items/entities/myitem.entity';

@Injectable({ scope: Scope.DEFAULT })
export class CustomSessionService {
  constructor(
    @InjectRepository(CustomSession)
    private readonly customSessionRepository: Repository<CustomSession>,
    @InjectRepository(MyItem)
    private readonly myItemRepository: Repository<MyItem>,
  ) {}

  async findOneByUserId({
    userId,
  }: ICustomSessionServiceFindOneByUserId): Promise<CustomSession | null> {
    return this.customSessionRepository.findOne({
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
        user: {
          id: true,
        },
        product: {
          id: true,
        },
      },
    });
  }

  findOneBySessionId({
    sessionId,
  }: ICustomSessionServiceFindOneBySessionId): Promise<CustomSession | null> {
    return this.customSessionRepository.findOne({
      where: { id: sessionId },
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
        user: {
          id: true,
        },
        product: {
          id: true,
        },
      },
    });
  }

  async create({
    createCustomSessionDto,
  }: ICustomSessionServiceCreate): Promise<CustomSession | null> {
    const { user_id, product_id, ...sessionData } = createCustomSessionDto;

    const existing = await this.customSessionRepository.findOne({
      where: { user: { id: user_id } },
    });

    if (existing) {
      await this.customSessionRepository.update(
        { id: existing.id },
        {
          ...sessionData,
          user: { id: user_id } as any,
          product: { id: product_id } as any,
        },
      );
      return this.customSessionRepository.findOne({
        where: { id: existing.id },
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
          user: {
            id: true,
          },
          product: {
            id: true,
          },
        },
      });
    }

    const savedSession = await this.customSessionRepository.save({
      ...sessionData,
      user: { id: user_id } as any,
      product: { id: product_id } as any,
    });

    return this.customSessionRepository.findOne({
      where: { id: savedSession.id },
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
        user: {
          id: true,
        },
        product: {
          id: true,
        },
      },
    });
  }

  async createFromMyItem({
    myitemId,
    userId,
  }: ICustomSessionServiceCreateFromMyItem): Promise<CustomSession | null> {
    const myItem = await this.myItemRepository.findOne({
      where: { id: myitemId },
      relations: ['user', 'product'],
    });

    if (!myItem) {
      throw new NotFoundException('내 아이템을 찾을 수 없습니다.');
    }

    if (!myItem.user || myItem.user.id !== userId) {
      throw new ForbiddenException('해당 아이템에 접근 권한이 없습니다.');
    }

    const existing = await this.customSessionRepository.findOne({
      where: { user: { id: userId } },
    });

    const sessionData = {
      name: myItem.name,
      custom_name: myItem.custom_name,
      color: myItem.color,
      material: myItem.material,
      size: myItem.size,
      model_type: myItem.model_type,
    };

    if (existing) {
      await this.customSessionRepository.update(
        { id: existing.id },
        {
          ...sessionData,
          user: { id: userId } as any,
          product: { id: myItem.product.id } as any,
        },
      );

      return this.customSessionRepository.findOne({
        where: { id: existing.id },
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
          user: {
            id: true,
          },
          product: {
            id: true,
          },
        },
      });
    }

    const savedSession = await this.customSessionRepository.save({
      ...sessionData,
      user: { id: userId } as any,
      product: { id: myItem.product.id } as any,
    });

    return this.customSessionRepository.findOne({
      where: { id: savedSession.id },
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
        user: {
          id: true,
        },
        product: {
          id: true,
        },
      },
    });
  }
}
