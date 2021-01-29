import { Resolver } from '@nestjs/graphql';
import { User } from './user.entity';

@Resolver(User)
export class UserResolver {
  // TODO: Remove "passwordHash"
  // TODO: Remove "passwordSalt"
}
