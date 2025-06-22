import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMyItemInput } from './create-myitem.input';

@InputType()
export class UpdateMyItemInput extends PartialType(CreateMyItemInput) {}
