import { PartialType } from '@nestjs/mapped-types';
import { CreateMyItemDto } from './create-myitem.dto';

export class UpdateMyItemDto extends PartialType(CreateMyItemDto) {}
