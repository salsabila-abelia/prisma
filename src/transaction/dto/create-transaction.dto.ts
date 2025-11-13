import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Payment } from "@prisma/client";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsString()
    paymentMethod: Payment;

    @IsNotEmpty()
    @IsString()
    orderName: string;

    @IsNotEmpty()
    @ValidateNested()
    detail: DetailMenuDto[];
}

export class DetailMenuDto {
    @IsNumber()
    @IsNotEmpty()
    menuId: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

}
