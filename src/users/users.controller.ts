import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard, Roles } from 'src/helper/roles-guard';
import { AuthGuard } from '@nestjs/passport';
import { FindUserDto } from './dto/find-user.dto';
//terminal: npx nest g resource menu
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  findAll(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id') //put sama patch itu sma sama untuk mengubah data (tapi klo put mengubah semuanya, walaupun datanya sama, put itu untuk edit edit, kyk email nama dll. klo patch itu hanya mengganti sebagian data saja yg tercantum, jd sesaui permintaan aja, yg lain akan dibiarkan, klo patch lebih baik buat reset password)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
