import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ApiHost } from 'src/constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : ['http://localhost'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  const configSwagger = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('User')
    .setDescription('API que permite la gestion de usuarios.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('', app, document);
  await app.listen(ApiHost.PORT, "0.0.0.0");
}
bootstrap();