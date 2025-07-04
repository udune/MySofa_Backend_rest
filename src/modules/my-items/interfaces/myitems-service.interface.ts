import { CreateMyItemDto } from '../dto/create-myitem.dto';
import { UpdateMyItemDto } from '../dto/update-myitem.dto';
import { MyItem } from '../entities/myitem.entity';

export interface IMyItemsServiceCreate {
  createMyitemDto: CreateMyItemDto;
}

export interface IMyItemsServiceUpdate {
  id: string;
  updateMyitemDto: UpdateMyItemDto;
}

export interface IMyItemsServiceDelete {
  id: string;
}

export interface IMyItemsServiceExist {
  myitem: MyItem | null;
}

export interface IMyItemsServiceFindOne {
  id: string;
}
