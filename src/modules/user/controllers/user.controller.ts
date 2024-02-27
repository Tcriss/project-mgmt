import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, EditUserDto } from '../dto';
import { User } from '../entities';
import { ResponseI } from 'src/common/interfaces';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Promise<User> {
        return this.userService.findOneUser(uuid);
    }

    @UseInterceptors(ClassSerializerInterceptor)
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
