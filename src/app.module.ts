import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './apis/accounts/email.module';
import { ProductsModule } from './apis/products/products.module';
import { MyItemsModule } from './apis/myitems/myitems.module';
import { UsersModule } from './apis/accounts/users.module';
import { CustomSessionModule } from './apis/custom_session/custom_session.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    EmailModule,
    ProductsModule,
    MyItemsModule,
    UsersModule,
    CustomSessionModule,
  ],
})
export class AppModule {}
