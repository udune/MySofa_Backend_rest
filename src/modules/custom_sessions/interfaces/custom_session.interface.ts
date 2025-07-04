import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { CreateCustomSessionDto } from '../dto/create-custom_session.dto';

export interface ICustomSessionServiceFindOneByUserId {
  userId: string;
}

export interface ICustomSessionServiceFindOneBySessionId {
  sessionId: string;
}

export interface ICustomSessionServiceCreate {
  createCustomSessionInput: CreateCustomSessionDto;
  user: User;
  product: Product;
}
