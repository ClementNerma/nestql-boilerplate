import { Module } from '@nestjs/common';
import { GraphQLModule as BaseGraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Option, println, Stringifyable } from 'typescript-core';

@Module({
  imports: [
    BaseGraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src', 'graphql', 'schema.gql'),

      formatError(error) {
        println(
          '{!}',
          new Stringifyable({
            rootItem: {
              ref: null,
              type: 'error',
              typename: 'GraphQLError',
              message: error.originalError?.message || error.message,
              stack: Option.maybe(error.stack),
              additionalFields: [
                [
                  'path',
                  Option.maybe(error.path).map((path) => ({
                    ref: null,
                    type: 'text',
                    text: path.join('.'),
                  })),
                ],
              ],
            },
            duplicateRefs: new Set(),
          }),
        );

        return error;
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class GraphQLModule {}
