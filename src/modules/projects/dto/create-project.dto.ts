import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    task: string;
}