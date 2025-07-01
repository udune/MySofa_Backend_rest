import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class AppConfig {
  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_DATABASE: string;

  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  EMAIL_SERVICE_USER: string;

  @IsString()
  EMAIL_SERVICE_PASS: string;

  @IsOptional()
  @IsString()
  EMAIL_SENDER?: string;
}
