import { Controller, Get, Req, Param, Post, Put, Delete, Query  } from '@nestjs/common'; //stiap nambah yg disini , nya jg ditambah
import type { Request } from 'express'
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    @Get('all')
    findAll(@Req() request: Request) {
        return this.UserService.findAll();
    }

    @Get(':name')
    findOne(@Param() params: any): string {
        return `This action returns ${name} user`;
    }

    @Get()
    find(@Query('age') age: number, @Query('breed') breed : string ) {
        return `This action returns all user filtered by age: ${age} and breed: ${breed}`;
    }

    @Post()
    create(): string {
        return 'This action adds a new user';
    }

    @Put(':id')
    update(@Param('id') id: string): string {
        return `This action update user id ${id}`;
    }
    
    @Delete(':id')
    delete(@Param('id') id: string): string {
        return `This action delete user id ${id}`;
    }

} //pas di web dia akan me return yg sesuai dipanggil


    //@Get('all')//tdk ada standart yg penting itu mewakili datanya 
    //findAll(@Req() request: Request): String {
    // return 'This action returns all users';
    //}
//} 
//controller ini gunanya yg utama untuk membuat API
// cara mengaksesnya dgn di kasi / di localhost:3000 nya
//ketika bikin 2 API atau lebih keduanya harus punya fungsinya masing masing, gaboleh sama, atau ngga ya bakal error

//https://localhost:3000/user/Name nah "name" nya ini parameter
    
