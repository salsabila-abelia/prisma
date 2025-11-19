import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UploadedFile } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RoleGuard, Roles } from 'src/helper/roles-guard';
import { AuthGuard } from '@nestjs/passport'; 
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')
  create(@Body() createMenuDto: CreateMenuDto,@UploadedFile() fileImage: Express.Multer.File) 
  {
    return this.menuService.create(createMenuDto, fileImage);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('ADMIN')


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}


