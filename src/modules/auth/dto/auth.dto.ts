import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AuthI } from "src/common/interfaces";

export class AuthDto implements AuthI{
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsString()
    userName?: string;

    @IsOptional()
    @IsEmail()
    email?: string; 
}