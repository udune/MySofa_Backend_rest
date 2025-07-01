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
      where: { session_id: Number(sessionId) },
    });
  }

  async create({
    createCustomSessionInput,
    user,
    product,
  }: ICustomSessionServiceCreate): Promise<CustomSession | null> {
    const existing = await this.customSessionRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (existing) {
      await this.customSessionRepository.update(
        { session_id: existing.session_id },
        {
          ...createCustomSessionInput,
          user,
          product,
        },
      );
      return this.customSessionRepository.findOneBy({
        session_id: existing.session_id,
      });
    }

    return this.customSessionRepository.save({
      ...createCustomSessionInput,
      user,
      product,
    });
  }
}
