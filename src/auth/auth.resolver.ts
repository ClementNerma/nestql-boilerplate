import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { GqlAuth, ViewerId } from 'src/graphql/auth';
import { UserLoginDTO } from 'src/user/dtos/user.login.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Query(() => User, { nullable: true })
  @GqlAuth(true)
  async viewer(@ViewerId() viewerId?: string): Promise<User | null> {
    return viewerId ? this.userService.findOne(viewerId) : null;
  }

  @Mutation(() => String)
  async login(@Args('input') input: UserLoginDTO): Promise<string> {
    const user = await this.authService.login(
      input.username,
      input.plainPassword,
    );

    if (!user) {
      throw new AuthenticationError('Bad credentials provided');
    }

    return user;
  }
}
