import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  custom_name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  color: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  material: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  size: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  model_type: string;
}
