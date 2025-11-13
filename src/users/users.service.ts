import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service'; 
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor( 
    private prisma: PrismaService,
    private readonly bcrypt: BcryptService
  ){}
  
  async create(createUserDto: CreateUserDto) {
    try{
      const { name, email, password, role } = createUserDto;
      const createuser = await this.prisma.user.create({
        data: {
          name,
          email,
          //password
          password: await this.bcrypt.hashPassword(password),
          role
        }
      })
      return {
        success: true,
        message: "user create successfully",
        data: createuser
      }
    } catch (error) {
      return {
        success: false,
        message: `Something went wrong: ${error.message}`,
        data: null
      }
    }
  }

async findAll() {
    try {
      const user = await this.prisma.user.findMany({
      })

      return {
        success: true,
        message: "user data found successfully",
        data: user
      }
    } catch (error) {
      return {
        success: false,
        message: `error when get user: ${error.message}`,
        data: null
      }
      
    }
  }

  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }

   async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const{name, email, password, role} = updateUserDto
      
      const findUser = await this.prisma.user.findFirst({
        where: { id: id}
      })
    if (!findUser){
      return{
        succes: false,
        message: `User does not exists`,
        data: null
      }
    }

  const updateUser = await this.prisma.user.update({
    where: {id: id},
    data: {
      name: name ?? findUser.name, //tanda tanya 2 : (ngecek undifined) klo gaada data nya alias null atau undifined yg diambil refuse data atau data dri data sebelumnya nah klo kita ga ngemasukin name psti di ambil dr data sebelumnya
      email: email ?? findUser.email,
      role: role ?? findUser.role,
      //password: password ?? findUser.password,
      password: password ? await this.bcrypt.hashPassword(password) : findUser.password //tanda tanya 1 : bahasa singkatnya itu percabangan kayak : if true maka ini klo salah maka ini _?_:_ (titik dua(:) artinya else, tanda tanya(?) artnya if)
    } //beda tanda tanya aja udh beda logika 
  })
  return{
    success: true,
    message: `New User has updated`,
    data: updateUser
  }
 
}catch (error) {
  return{
    success: false,
    message: `error when update user: ${error.message}`,
    data: null
  }

}
  }
  async remove(id: number){
    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          id: id
        }
      })
      if (!findUser){
        return {
          success: false,
          message: `user does not exist`,
          data: null
        }
      }
      const deleteUser = await this.prisma.user.delete({
        where: {
          id: id
        }
      })
      return{
        success: true,
        message: `User has delete`,
        data: deleteUser
      }
    }catch (error){
      return{
        success: false,
        message: `error when delete user: ${error.message}`,
        data: null
      }
    }
  }
}