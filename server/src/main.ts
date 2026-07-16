import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow('PORT') ?? 3000;

  await app.listen(port);

  logger.log(`Nest Application started on PORT : ${port}`);
}
bootstrap();
