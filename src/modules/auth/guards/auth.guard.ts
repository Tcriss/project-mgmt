import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { AuthService } from "../services/auth.service";
import { PUBLIC_KEY } from "src/common/constants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ) {}

    private async extractTokenFromHeader(headers: Headers): Promise<string> {
        const [type, token] = headers['auth']?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }

    private async verifyToken(req: Request): Promise<boolean> {
        if (!req.headers) throw new HttpException('No headers provided', HttpStatus.BAD_REQUEST);

        const token: string = await this.extractTokenFromHeader(req.headers);

        if (!token) throw new UnauthorizedException('Invalid token');

        const payload = await this.authService.verifyToken(token);
        req['user'] = payload;

        return true;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
          context.getHandler(),
          context.getClass()
        ]);

        if (isPublic) return true;

        return await this.verifyToken(req);
    }
}