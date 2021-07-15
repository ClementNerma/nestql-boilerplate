import { Module } from '@nestjs/common'
import { GraphQLModule as BaseGraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

@Module({
  imports: [
    BaseGraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src', 'graphql', 'schema.gql'),

      formatError(error) {
        console.error(error, error.path?.join('.'))
        return error
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class GraphQLModule {}
