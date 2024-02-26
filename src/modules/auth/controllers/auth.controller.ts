import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { PublicRoute } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @PublicRoute()
    @Post()
    login(@Body() auth: AuthDto): Promise<unknown> {
        return this.authService.generateJwt(auth.userId, auth.password, auth.userName, auth.email);
    }
}
