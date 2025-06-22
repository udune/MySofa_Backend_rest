import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MyItem } from '../../myitems/entities/myitem.entity';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  product_id: number;

  @OneToMany(() => MyItem, (myitem) => myitem.product)
  myitems: MyItem[];

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
