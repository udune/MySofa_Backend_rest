import { MyItem } from '@/src/modules/my-items/entities/myitem.entity';
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
import { UserRole } from '../enums/role.enum';
import { CustomSession } from '../../custom_sessions/entities/custom_session.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '사용자 ID' })
  id: string;

  @Column({ length: 50 })
  @Index()
  @ApiProperty({ description: '닉네임', maxLength: 50 })
  nickname: string;

  @Column({ unique: true, length: 100 })
  @Index()
  @ApiProperty({ description: '이메일' })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({
    enum: UserRole,
    description: '사용자 역할',
  })
  role: UserRole;

  @OneToMany(() => MyItem, (myitem) => myitem.user)
  myitems: MyItem[];

  @OneToMany(() => CustomSession, (session) => session.user)
  custom_sessions: CustomSession[];

  @CreateDateColumn()
  @ApiProperty({ description: '생성일' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
