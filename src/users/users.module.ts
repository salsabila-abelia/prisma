import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { BcryptService } from 'src/bcrypt/bcrypt.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
})
export class UsersModule {}
