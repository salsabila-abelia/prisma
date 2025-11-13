import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';


@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createTransactionDto: CreateTransactionDto, userId?: number) {
    try {
      const { paymentMethod, orderName, detail } = createTransactionDto;

      /** get all selected menu */
      const arrMenuId = detail.map(it => it.menuId)
      const selectedMenu = await this.prisma.menu.findMany({
        where: { id_menu: { in: arrMenuId } }
      })

      const detailData: {
        quantity: number,
        purchase_price: number,
        menuId: number
      }[] = []

      const total: number = detail.reduce((total, menu) => {
        const { menuId, quantity } = menu
        const findMenu = selectedMenu.find(it => it.id_menu === menuId)
        detailData.push({
          quantity, menuId, purchase_price: findMenu?.harga || 0
        })
        if (findMenu) return total + (quantity * findMenu.harga)
          return 0
      }, 0)

       const createTransaction = await this.prisma.transaksi.create({
               data: {
                   total,
                   paymentMethod,
                   userId,
                   orderName,
                   detail: { createMany: { data: detailData } }
               }
           })
           return {
               success: true,
               message: "menu created successfully",
               data: createTransaction
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
           return this.prisma.transaksi.findMany({
               include: {
                   detail: {
                       include: {
                           Menu: true
                       }
                   }
               },
               orderBy: {
                   createdAt: 'desc'
               }
           });
       } catch (error) {
           return {
               success: false,
               message: `Something went wrong: ${error.message}`,
               data: null
           }
       }
   }
   async findOne(id: number) {
       try {
           return this.prisma.transaksi.findUnique({
               where: { id },
               include: {
                   detail: {
                       include: {
                           Menu: true
                       }
                   }
               }
           });
       } catch (error) {
           return {
               success: false,
               message: `Something went wrong: ${error.message}`,
               data: null
           }
       }
   }
}