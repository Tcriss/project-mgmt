import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { Status } from "src/common/enums/status.enum";

export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    assigned: string;
}