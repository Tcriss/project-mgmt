import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Status } from "src/common/enums/status.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @IsNotEmpty()
    @IsString()
    assigned: string;
}