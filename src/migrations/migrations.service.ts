import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MigrationsService {
  constructor(private readonly userService: UserService) {}

  async init(): Promise<true> {
    // Create the administrator user (full privileges)
    if (!(await this.userService.findByUsername('admin'))) {
      await this.userService.create({
        email: 'admin@internal.zzz',
        username: 'admin',
        plainPassword: 'admin',
      });
    }

    // Create the guest user (no privilege)
    if (!(await this.userService.findByUsername('guest'))) {
      await this.userService.create({
        email: 'guest@internal.zzz',
        username: 'guest',
        plainPassword: 'guest',
      });
    }

    return true;
  }
}
