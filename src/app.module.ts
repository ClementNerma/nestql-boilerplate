import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { GraphQLModule } from './graphql/graphql.module'
import { MigrationsModule } from './migrations/migrations.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MikroOrmModule.forRoot(),
    GraphQLModule,

    UserModule,
    AuthModule,
    MigrationsModule,
  ],
  providers: [],
})
export class AppModule {}
