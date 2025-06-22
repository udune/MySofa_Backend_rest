import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCustomSessionInput } from './create-custom_session.input';

@InputType()
export class UpdateCustomSessionInput extends PartialType(
  CreateCustomSessionInput,
) {}
