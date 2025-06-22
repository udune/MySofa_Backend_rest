import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EmailModule } from './apis/accounts/email.module';
import { ProductsModule } from './apis/products/products.module';
import { MyItemsModule } from './apis/myitems/myitems.module';
import { UsersModule } from './apis/accounts/users.module';
import { MyItem } from './apis/myitems/entities/myitem.entity';
import { User } from './apis/accounts/entities/user.entity';
import { Product } from './apis/products/entities/product.entity';
import { CustomSessionModule } from './apis/custom_session/custom_session.module';
import { CustomSession } from './apis/custom_session/entities/custom_session.entity';

@Module({
  imports: [
    EmailModule,
    ProductsModule,
    MyItemsModule,
    UsersModule,
    CustomSessionModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Product, MyItem, User, CustomSession]),
  ],
})
export class AppModule {}
