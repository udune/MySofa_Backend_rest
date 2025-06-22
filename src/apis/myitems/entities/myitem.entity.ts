import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/accounts/entities/user.entity';
import { Product } from 'src/apis/products/entities/product.entity';
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

@ObjectType()
@Entity('myitems')
export class MyItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  myitem_id: number;

  @ManyToOne(() => User, (user) => user.myitems)
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product, (product) => product.myitems)
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
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
