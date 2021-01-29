import { Mutation, Resolver } from '@nestjs/graphql'
import { MigrationsService } from './migrations.service'

@Resolver()
export class MigrationsResolver {
  constructor(private readonly migrationsService: MigrationsService) {}

  @Mutation(() => Boolean)
  async init(): Promise<true> {
    return this.migrationsService.init()
  }
}
