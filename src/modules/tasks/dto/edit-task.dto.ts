import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "src/common/enums/status.enum";

export class EditTaskDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Status)
    status: Status;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    assigned: string;
}