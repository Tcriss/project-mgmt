import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Roles } from "src/common/enums";

export class EditUserDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    firstName: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    lastName: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    age: number;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    userName: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Roles)
    role: Roles;
}