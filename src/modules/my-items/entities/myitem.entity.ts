import { User } from '@/src/modules/users/entities/user.entity';
import { Product } from '@/src/modules/products/entities/product.entity';
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
import { ApiProperty } from '@nestjs/swagger';

@Entity('myitems')
@Index(['name', 'deleted_at'])
@Index(['created_at', 'deleted_at'])
export class MyItem {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '나의 상품 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @Column()
  name: string;

  @Column()
  custom_name: string;

  @Column()
  color: string;

  @Column()
  material: string;

  @Column()
  size: string;

  @Column()
  model_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.my_items)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.my_items)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
