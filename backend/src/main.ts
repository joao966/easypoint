import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  if (!configService.isProduction()) {
    const config = new DocumentBuilder()
      .setTitle('EASY_POINT')
      .setDescription('Pontos e gerenciamento')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.getValue("SERVER_PORT", true));
}

bootstrap();
