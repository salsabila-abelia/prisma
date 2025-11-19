import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { Transaction } from './entities/transaction.entity';


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

    async findAll(findTransactionDto: FindTransactionDto) {
       try {
            const { page = 1, limit = 10, startDate, endDate } = findTransactionDto;
            const skip = (page - 1) * limit;

            const where: any = {} ;
            //filter by date range
            if (startDate || endDate) {
                where.createdAt = {};
                if (startDate) {
                    const start = new Date(startDate);
                    if(!isNaN(start.getTime())) {
                        where.createdAt.gte = start;
                    }
                }
                if (endDate) {
                    const end = new Date(endDate);
                    if (!isNaN(end.getTime())) {
                        //set jam akhir: 23:59:59
                        end.setHours(23, 59, 59, 999);
                        where.createdAt.lte = end;
                    }
                }
            }
            
           const Transaksi = await this.prisma.transaksi.findMany({
               where,
               skip: skip,
               take: Number(limit), 
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
           const total = await this.prisma.transaksi.count({ where });

           return {
            success: true,
            message: 'transaction data found successfully',
            data: Transaction,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total/ limit),
            },

           };
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