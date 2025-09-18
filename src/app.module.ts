import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from '../prisma/users/users.module';
import { PrismaModule } from './prisma.modul'; 

@Module({
  
  imports: [TodoModule, UsersModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
