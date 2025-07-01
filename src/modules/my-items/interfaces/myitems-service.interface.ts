import { CreateMyItemInput } from '../dto/create-myitem.input';
import { UpdateMyItemInput } from '../dto/update-myitem.input';
import { MyItem } from '../entities/myitem.entity';

export interface IMyItemsServiceCreate {
  createMyitemInput: CreateMyItemInput;
}

export interface IMyItemsServiceUpdate {
  myitemId: number;
  updateMyitemInput: UpdateMyItemInput;
}

export interface IMyItemsServiceDelete {
  myitemId: number;
}

export interface IMyItemsServiceExist {
  myitem: MyItem | null;
}

export interface IMyItemsServiceFindOne {
  myitemId: number;
}
