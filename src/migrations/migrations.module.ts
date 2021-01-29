import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MigrationsResolver } from './migrations.resolver';
import { MigrationsService } from './migrations.service';

@Module({
  imports: [UserModule],
  providers: [MigrationsResolver, MigrationsService],
  exports: [MigrationsResolver, MigrationsService],
})
export class MigrationsModule {}
