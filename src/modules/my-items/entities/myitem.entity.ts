import { User } from '@/src/modules/users/entities/user.entity';
import { Product } from '@/src/modules/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('myitems')
export class MyItem {
  @PrimaryGeneratedColumn()
  myitem_id: number;

  @ManyToOne(() => User, (user) => user.myitems)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.myitems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

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
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
