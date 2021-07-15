import { NestFactory } from '@nestjs/core'
import { config as dotenv } from 'dotenv'
import { install as installSourceMap } from 'source-map-support'
import { AppModule } from './app.module'

installSourceMap()

dotenv({ path: '.env' })
dotenv({ path: '.env.dev' })

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}

bootstrap()
