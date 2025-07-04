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
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: '유저 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @Column({ length: 50 })
  @Index()
  @ApiProperty({
    description: '닉네임',
    example: '소파왕',
    maxLength: 50,
    minLength: 2,
  })
  nickname: string;

  @Column({ unique: true, length: 100 })
  @Index()
  @ApiProperty({
    description: '이메일',
    example: 'sofa@example.com',
    format: 'email',
    maxLength: 100,
  })
  email: string;

  @Column()
  @ApiHideProperty()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({
    enum: UserRole,
    description: '유저 역할',
    example: UserRole.USER,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => MyItem, (myitem) => myitem.user)
  @ApiProperty({
    description: '유저의 아이템 목록',
    type: () => [MyItem],
    required: false,
  })
  my_items: MyItem[];

  @OneToMany(() => CustomSession, (session) => session.user)
  @ApiProperty({
    description: '유저의 커스텀 세션 목록',
    type: () => [CustomSession],
    required: false,
  })
  custom_sessions: CustomSession[];

  @CreateDateColumn()
  @ApiProperty({
    description: '생성일',
    example: '2025-01-01T00:00:00.000Z',
    type: Date,
  })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: '수정일',
    example: '2025-01-01T00:00:00.000Z',
    type: Date,
  })
  updated_at: Date;

  @DeleteDateColumn()
  @ApiHideProperty()
  deleted_at: Date;
}
