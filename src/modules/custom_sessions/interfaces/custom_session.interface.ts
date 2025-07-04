import { CreateCustomSessionDto } from '../dto/create-custom_session.dto';

export interface ICustomSessionServiceFindOneByUserId {
  userId: string;
}

export interface ICustomSessionServiceFindOneBySessionId {
  sessionId: string;
}

export interface ICustomSessionServiceCreate {
  createCustomSessionDto: CreateCustomSessionDto;
}
