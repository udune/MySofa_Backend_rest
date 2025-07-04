import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '소파왕',
    description: '사용자 닉네임',
    minLength: 2,
    maxLength: 20,
    pattern: '^[가-힣a-zA-Z0-9_]+$',
  })
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @IsString({ message: '닉네임은 문자열이어야 합니다.' })
  @MinLength(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' })
  @MaxLength(20, { message: '닉네임은 최대 20자까지 가능합니다.' })
  @Matches(/^[가-힣a-zA-Z0-9_]+$/, {
    message: '닉네임은 한글, 영문, 숫자, 밑줄(_)만 사용 가능합니다.',
  })
  nickname: string;

  @ApiProperty({
    example: 'sofa@naver.com',
    description: '이메일 주소',
    format: 'email',
    maxLength: 100,
  })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @MaxLength(100, { message: '이메일은 최대 100자까지 가능합니다.' })
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: '비밀번호 (8자 이상, 영문+숫자+특수문자 조합)',
    minLength: 8,
    pattern: '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
  })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;
}
