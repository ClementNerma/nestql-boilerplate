import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { UserCreateDTO } from './dtos/user.create.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
  ) {}

  async findOne(filters: FilterQuery<User>): Promise<User | null> {
    return this.usersRepository.findOne(filters);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ username });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ email });
  }

  async create(dto: UserCreateDTO): Promise<User> {
    const user = new User();

    if (!dto.username) throw new ApolloError('Please fill in a username');
    if (!dto.email) throw new ApolloError('Please fill in an email address');

    if (dto.plainPassword.length < 5) {
      throw new ApolloError('Please provide an at least 5-character password');
    }

    if (await this.findByUsername(dto.username)) {
      throw new ApolloError(`Username "${dto.username}" is already taken`);
    }

    if (await this.findByEmail(dto.email)) {
      throw new ApolloError(
        `Email address "${dto.email}" is already used by another user`,
      );
    }

    user.username = dto.username;
    user.email = dto.email;
    user.passwordSalt = await bcrypt.genSalt();
    user.passwordHash = await bcrypt.hash(dto.plainPassword, user.passwordSalt);

    await this.usersRepository.persistAndFlush(user);

    return user;
  }
}
