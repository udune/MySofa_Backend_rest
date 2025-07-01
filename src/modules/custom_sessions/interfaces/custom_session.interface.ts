import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateCustomSessionInput } from '../dto/create-custom_session.input';

export interface ICustomSessionServiceFindOneByUserId {
  userId: number;
}

export interface ICustomSessionServiceFindOneBySessionId {
  sessionId: number;
}

export interface ICustomSessionServiceCreate {
  createCustomSessionInput: CreateCustomSessionInput;
  user: User;
  product: Product;
}
