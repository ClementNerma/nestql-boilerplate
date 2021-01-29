import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

export type JwtPayload = { uuid: string };

export type AuthPayload = JwtPayload;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async validateUser(
    username: string,
    plainPassword: string,
  ): Promise<JwtPayload | null> {
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(plainPassword, user.passwordHash))) {
      return { uuid: user.uuid };
    }

    return null;
  }

  async login(username: string, plainPassword: string): Promise<string | null> {
    const maybeUser = await this.validateUser(username, plainPassword);

    return maybeUser
      ? this.jwtService.sign(maybeUser, { expiresIn: '1h' })
      : null;
  }
}
