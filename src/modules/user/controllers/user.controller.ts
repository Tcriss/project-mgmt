import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserService } from '../services/user.service';
import { CreateUserDto, EditUserDto } from '../dto';
import { User } from '../entities';
import { ResponseI } from 'src/common/interfaces';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Promise<User> {
        return this.userService.findOneUser(uuid);
    }

    @Post()
    create(@Body() user: CreateUserDto): Promise<ResponseI> {
        return this.userService.createUser(user);
    }

    @Patch(':uuid')
    edit(@Param('uuid') uuid: string, @Body() user: EditUserDto): Promise<ResponseI> {
        return this.userService.editUser(uuid, user);
    }

    @Delete(':uuid')
    delete(@Param('uuid') uuid: string): Promise<void> {
        return this.userService.deleteUser(uuid);
    }
}
