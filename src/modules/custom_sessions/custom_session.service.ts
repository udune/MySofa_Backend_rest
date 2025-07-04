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
    });
  }

  findOneBySessionId({
    sessionId,
  }: ICustomSessionServiceFindOneBySessionId): Promise<CustomSession | null> {
    return this.customSessionRepository.findOne({
      where: { id: sessionId },
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
      return this.customSessionRepository.findOneBy({
        id: existing.id,
      });
    }

    return this.customSessionRepository.save({
      ...sessionData,
      user: { id: user_id } as any,
      product: { id: product_id } as any,
    });
  }
}
