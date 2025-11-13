import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { Kategori } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    @IsOptional()
    @IsString()
    name: string;
}
