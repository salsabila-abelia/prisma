/*
  Warnings:

  - You are about to alter the column `kategori` on the `menu` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `paymentMethod` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Added the required column `updateAt` to the `DetailTransaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailtransaksi` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `menu` MODIFY `kategori` ENUM('Makanan', 'Minuman', 'Snack') NOT NULL DEFAULT 'Makanan';

-- AlterTable
ALTER TABLE `transaksi` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `paymentMethod` ENUM('CASH', 'QRIS') NOT NULL DEFAULT 'QRIS';
