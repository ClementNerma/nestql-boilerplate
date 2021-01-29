import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@Entity()
@ObjectType()
export class User {
  @PrimaryKey()
  uuid = v4();

  @Property()
  @Unique()
  email!: string;

  @Property()
  @Unique()
  username!: string;

  @Property()
  passwordHash!: string;

  @Property()
  passwordSalt!: string;
}
