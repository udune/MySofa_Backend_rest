import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from './modules/users/email.module';
import { ProductsModule } from './modules/products/products.module';
import { MyItemsModule } from './modules/my-items/myitems.module';
import { UsersModule } from './modules/users/users.module';
import { CustomSessionModule } from './modules/custom_sessions/custom_session.module';
import { AppConfig } from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<AppConfig>) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
        entities: [__dirname + '/modules/**/*.entity.{ts,js}'],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    EmailModule,
    ProductsModule,
    MyItemsModule,
    CustomSessionModule,
  ],
})
export class AppModule {}
