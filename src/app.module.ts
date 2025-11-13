import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma.modul'; 
import { BcryptService } from './bcrypt/bcrypt.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [TodoModule, UsersModule, PrismaModule, BcryptModule, AuthModule, MenuModule, TransactionModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, BcryptService], //klo punya org lain yg kita impor nambahinnya di provider
})
export class AppModule {}
