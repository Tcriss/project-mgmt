import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(userService: UserService) {}

    @Get()
    findAll(): void {}
}
