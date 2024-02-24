import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Roles } from "src/common/enums";

export class EditUserDto {
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsEmail()
    age: number;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    userName: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(Roles)
    role: Roles;
}