import { CreateCustomSessionDto } from './create-custom_session.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCustomSessionDto extends PartialType(
  CreateCustomSessionDto,
) {}
