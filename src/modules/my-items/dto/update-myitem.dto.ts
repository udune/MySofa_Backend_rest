import { PartialType } from '@nestjs/swagger';
import { CreateMyItemDto } from './create-myitem.dto';

export class UpdateMyItemDto extends PartialType(CreateMyItemDto) {}
