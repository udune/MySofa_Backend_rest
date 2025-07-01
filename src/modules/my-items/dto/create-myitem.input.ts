import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMyItemInput {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  custom_name: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  material: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsString()
  model_type: string;
}
