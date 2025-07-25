import { UserRole } from '@/src/modules/users/enums/role.enum';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export class AllGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('인증이 필요합니다.');
    }

    if (user.role !== UserRole.USER && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('사용자 및 관리자 권한이 필요합니다.');
    }

    return true;
  }
}
