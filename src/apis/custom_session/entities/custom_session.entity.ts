import { Field, Int, ObjectType } from '@nestjs/graphql';
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
import { User } from '../../accounts/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('custom_session')
@ObjectType()
export class CustomSession {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  session_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  @Field(() => Product)
  product: Product;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  custom_name: string;

  @Field(() => String)
  @Column()
  color: string;

  @Field(() => String)
  @Column()
  material: string;

  @Field(() => String)
  @Column()
  size: string;

  @Field(() => String)
  @Column()
  model_type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
