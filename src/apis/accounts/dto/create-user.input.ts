import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @ApiProperty({ example: '소파왕' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'sofa@naver.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
