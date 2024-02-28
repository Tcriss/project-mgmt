import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthDto } from '../dto/auth.dto';
import { PublicAcces } from 'src/common/decorators/public.decorator';
import { ResponseI } from 'src/common/interfaces';
import { CreateUserDto } from 'src/modules/user/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@PublicAcces()
@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('login')
    login(@Body() auth: AuthDto): Promise<unknown> {
        return this.authService.login(auth.password, auth.userName, auth.email);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    register(@Body() user: CreateUserDto): Promise<ResponseI> {
        return this.userService.createUser(user);
    }
}
