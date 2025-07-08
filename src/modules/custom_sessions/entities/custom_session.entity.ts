import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('custom_session')
@Index(['name', 'deleted_at'])
@Index(['created_at', 'deleted_at'])
export class CustomSession {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '커스텀 상품 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: '상품명',
    example: 'classicsofa, modularsofa, privatesofa, roungesofa',
    maxLength: 100,
  })
  name: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: '커스텀 상품명',
    example: '나만의 특별한 소파',
    maxLength: 100,
  })
  custom_name: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: '색상',
    example: 'gray, beige, black',
    maxLength: 50,
  })
  color: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: '재질',
    example: 'fabric, leather',
    maxLength: 50,
  })
  material: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: '크기',
    example: 'small, large',
    maxLength: 50,
  })
  size: string;

  @Column({ length: 50 })
  @ApiProperty({
    description: '모델 타입',
    example: 'a, b',
    maxLength: 50,
  })
  model_type: string;

  @CreateDateColumn()
  @ApiProperty({
    description: '생성일',
    example: '2025-01-01T00:00:00.000Z',
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: '수정일',
    example: '2025-01-01T00:00:00.000Z',
  })
  updated_at: Date;

  @DeleteDateColumn()
  @ApiHideProperty()
  deleted_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: '유저 정보',
    type: () => User,
    example: { id: '01012335-c08a-4443-b3ca-b1f77b7e8390' },
  })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  @ApiProperty({
    description: '상품 정보',
    type: () => Product,
    example: { id: 'd38e297d-882a-49e5-9bf8-602e0907e69c' },
  })
  product: Product;
}
