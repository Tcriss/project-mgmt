import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { AuthI } from "src/common/interfaces";

export class AuthDto implements AuthI{
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    userName?: string;

    @IsOptional()
    email?: string; 
}