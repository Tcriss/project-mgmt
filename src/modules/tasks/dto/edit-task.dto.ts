import { IsEnum, IsOptional, IsString } from "class-validator";
import { Status } from "src/common/enums/status.enum";

export class EditTaskDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(Status)
    status: Status;

    @IsOptional()
    @IsString()
    assigned: string;
}