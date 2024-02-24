import { IsOptional, IsString } from "class-validator";

export class EditProjectDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}