import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: '상품명',
    example: 'classicsofa, modularsofa, privatesofa, roungesofa',
    maxLength: 100,
  })
  @IsNotEmpty({ message: '상품명을 입력해주세요.' })
  @IsString({ message: '상품명은 문자열이어야 합니다.' })
  @MaxLength(100, { message: '상품명은 최대 100자까지 가능합니다.' })
  name: string;

  @ApiProperty({
    description: '커스텀 상품명',
    example: '신제품 소파',
    maxLength: 100,
  })
  @IsNotEmpty({ message: '커스텀 상품명을 입력해주세요.' })
  @IsString({ message: '커스텀 상품명은 문자열이어야 합니다.' })
  @MaxLength(100, { message: '커스텀 상품명은 최대 100자까지 가능합니다.' })
  custom_name: string;

  @ApiProperty({
    description: '색상',
    example: 'gray, beige, black',
    maxLength: 50,
  })
  @IsNotEmpty({ message: '색상을 입력해주세요.' })
  @IsString({ message: '색상은 문자열이어야 합니다.' })
  @MaxLength(50, { message: '색상은 최대 50자까지 가능합니다.' })
  color: string;

  @ApiProperty({
    description: '재질',
    example: 'fabric, leather',
    maxLength: 50,
  })
  @IsNotEmpty({ message: '재질을 입력해주세요.' })
  @IsString({ message: '재질은 문자열이어야 합니다.' })
  material: string;

  @ApiProperty({
    description: '크기',
    example: 'small, large',
    maxLength: 50,
  })
  @IsNotEmpty({ message: '크기를 입력해주세요.' })
  @IsString({ message: '크기는 문자열이어야 합니다.' })
  @MaxLength(50, { message: '크기는 최대 50자까지 가능합니다.' })
  size: string;

  @ApiProperty({
    description: '모델 타입',
    example: 'a, b',
    maxLength: 50,
  })
  @IsNotEmpty({ message: '모델 타입을 입력해주세요.' })
  @IsString({ message: '모델 타입은 문자열이어야 합니다.' })
  @MaxLength(50, { message: '모델 타입은 최대 50자까지 가능합니다.' })
  model_type: string;
}
