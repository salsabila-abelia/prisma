import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "@prisma/client";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    @IsString()
    role: UserRole;

}
