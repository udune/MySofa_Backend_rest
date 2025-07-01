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
import { ApiProperty } from '@nestjs/swagger';
import { CustomSession } from '../../custom_sessions/entities/custom_session.entity';

@Entity('products')
@Index(['name', 'deletedAt'])
@Index(['createdAt', 'deletedAt'])
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '상품 ID' })
  id: string;

  @Column({ length: 100 })
  @Index()
  @ApiProperty({ description: '상품명', maxLength: 100 })
  name: string;

  @Column({ length: 100 })
  @ApiProperty({ description: '커스텀명', maxLength: 100 })
  customName: string;

  @Column({ length: 50 })
  @ApiProperty({ description: '색상', maxLength: 50 })
  color: string;

  @Column({ length: 50 })
  @ApiProperty({ description: '재질', maxLength: 50 })
  material: string;

  @Column({ length: 50 })
  @ApiProperty({ description: '크기', maxLength: 50 })
  size: string;

  @Column({ length: 50 })
  @ApiProperty({ description: '모델 타입', maxLength: 50 })
  modelType: string;

  @CreateDateColumn()
  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => MyItem, (myitem) => myitem.product, { cascade: true })
  myitems: MyItem[];

  @OneToMany(() => CustomSession, (session) => session.product, {
    cascade: true,
  })
  customSessions: CustomSession[];
}
