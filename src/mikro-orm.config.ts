import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs'

const options: MikroOrmModuleSyncOptions = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  type: 'postgresql',
  host: process.env['DB_HOST'] ?? 'localhost',
  dbName: process.env['DB_NAME'] ?? 'mango',
  user: process.env['DB_USERNAME'] ?? 'mango',
  password: process.env['DB_PASSWORD'] ?? 'mango',
}

export default options
