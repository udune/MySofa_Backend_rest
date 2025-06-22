import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { MyItem } from 'src/apis/myitems/entities/myitem.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../enums/role.enum';
import { CustomSession } from '../../custom_session/entities/custom_session.entity';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int)
  user_id: number;

  @OneToMany(() => MyItem, (myitem) => myitem.user)
  myitems: MyItem[];

  @OneToMany(() => CustomSession, (custom_session) => custom_session.user)
  custom_sessions: CustomSession[];

  @Field(() => String)
  @Column()
  nickname: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @HideField()
  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
