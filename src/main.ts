import { NestFactory } from '@nestjs/core';
import { install as installSourceMap } from 'source-map-support';
import { AppModule } from './app.module';
import { setupEnv } from './tscore';

installSourceMap();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

setupEnv();
bootstrap();
