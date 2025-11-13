import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuService {
 constructor(
  private prisma: PrismaService
 ) {}
 async create(createMenuDto: CreateMenuDto) {
  try {
    const { name, price, kategori, deskripsi } = createMenuDto;
    const createMenu = await this.prisma.menu.create({
      data: {
        nama: name,
        harga: Number(price),
        kategori,
        deskripsi
      }
    })
    return {
      success: true,
      message: "menu created successfully",
      data: createMenu
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
    const menus = await this.prisma.menu.findMany()
    return {
      success: true,
      message: "menu data found successfully",
      data: menus
    }
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong ${error.message}`,
      data: null
    }
  }
 }

 async findOne(id: number) {
  try {
    const findMenu = await this.prisma.menu.findFirst({ where: { id_menu: id } })
    if (!findMenu) {
      return {
        success: false, 
        message: `Menu does not exists`,
        data: null
      }
    }
    return {
      success: true,
      message:`Menu has retrieved`,
      data: findMenu
    }
} catch (error) {
  return {
    success: false,
    message: `Something went wrong: ${error.message}`,
    data: null 
  }
}
 }

 async update(id: number, UpdateMenuDto: UpdateMenuDto) {
  try {
    const { name, price, kategori, deskripsi} = UpdateMenuDto
    const findMenu = await this.prisma.menu.findFirst({ where: { id_menu: id} })
    if (!findMenu) {
      return {
        success: false,
        message: `Menu does not exists`,
        data: null
      }
    }

    const updateMenu = await this.prisma.menu.update({
      where: {id_menu: id},
      data: {
        nama: name ?? findMenu.nama,
        harga: Number(price) ?? findMenu.harga,
        kategori: kategori ?? findMenu.kategori,
        deskripsi: deskripsi ?? findMenu.deskripsi
      }
    })

    return {
      success: true,
      message: `Menu has updated`,
      data: updateMenu
    }

  } catch (error) {
    return {
      success: false,
      message: `Something went wrong: ${error.message}`,
      data: null
    }
  }
 }

 async remove(id: number) {
  try {
    const findMenu = await this.prisma.menu.findFirst({ where: { id_menu: id} })
    if (!findMenu) {
      return {
        success: false,
        message: `Menu does not exists`,
        data: null
      }
    }

    const deletedMenu = await this.prisma.menu.delete({ where: { id_menu: id} }) //sebelah kiri schema sebelah kanan dr remove
    return {
      success: true,
      message: `Menu has deleted`,
      data: deletedMenu
    }
  } catch (error) {
    return { 
      success: false,
      message: `Something went wrong: ${error.message}`,
      data: null
    }
  }
 }
}
