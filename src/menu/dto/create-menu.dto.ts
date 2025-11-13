import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Kategori } from "@prisma/client";

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    kategori: Kategori;

    @IsNotEmpty()
    @IsString()
    deskripsi: string;                                                                
}
