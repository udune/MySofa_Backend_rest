import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MyItem } from '../../my-items/entities/myitem.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CustomSession } from '../../custom_sessions/entities/custom_session.entity';

@Entity('products')
@Index(['name', 'deleted_at'])
@Index(['created_at', 'deleted_at'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '상품 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @Column({ length: 100 })
  @Index()
  @ApiProperty({
    description: '상품명',
    example: 'classicsofa, modularsofa, privatesofa, roungesofa',
    maxLength: 100,
  })
  name: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: '커스텀명',
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
    example: 'fabric, leater',
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

  @OneToMany(() => MyItem, (myitem) => myitem.product, { cascade: true })
  @ApiProperty({
    description: '이 상품을 기반으로 한 유저 아이템들',
    type: () => [MyItem],
    required: false,
  })
  my_items: MyItem[];

  @OneToMany(() => CustomSession, (session) => session.product, {
    cascade: true,
  })
  @ApiProperty({
    description: '이 상품의 커스터마이징 세션들',
    type: () => [CustomSession],
    required: false,
  })
  custom_sessions: CustomSession[];
}
