import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs'

const options: MikroOrmModuleSyncOptions = {
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'mango.sqlite3',
  type: 'sqlite',
}

export default options
