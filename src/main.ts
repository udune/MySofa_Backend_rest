import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.enableCors({
    origin: ['https://my-sofa.org', 'https://unity.my-sofa.org'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('MySofa API')
    .setDescription('MySofa Rest API 문서 By minchan kim')
    .setVersion('1.0')
    .addTag('Authentication', '인증 관련 API')
    .addTag('Users', '사용자 관리 API')
    .addTag('Products', '상품 관리 API')
    .addTag('MyItems', '나의 아이템 API')
    .addTag('CustomSessions', '커스텀 세션 API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
