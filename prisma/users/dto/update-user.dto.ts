import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsStrongPassword()
    password: string;
    
}
