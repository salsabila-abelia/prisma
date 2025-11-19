import { IsOptional, IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class FindTransactionDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

}