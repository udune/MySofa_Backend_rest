import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomSession } from './entities/custom_session.entity';
import { Repository } from 'typeorm';
import {
  ICustomSessionServiceCreate,
  ICustomSessionServiceFindOneBySessionId,
  ICustomSessionServiceFindOneByUserId,
} from './interfaces/custom_session.interface';

@Injectable({ scope: Scope.DEFAULT })
export class CustomSessionService {
  constructor(
    @InjectRepository(CustomSession)
    private readonly customSessionRepository: Repository<CustomSession>,
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
}
