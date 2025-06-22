import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: '유저 역할: 일반 유저(USER), 관리자(ADMIN)',
});
