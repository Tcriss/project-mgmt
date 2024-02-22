import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {

    constructor(userService: UserService) {}

    @Get()
    findAll(): string {
        return 'hello';
    }
}
