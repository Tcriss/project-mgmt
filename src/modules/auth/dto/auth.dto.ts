import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { AuthI } from "src/common/interfaces";

export class AuthDto implements AuthI{
    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    userName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string; 
}