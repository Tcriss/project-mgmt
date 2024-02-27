import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { Reflector } from "@nestjs/core";
import { PUBLIC_KEY } from "src/common/constants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector
    ) {}

    private async extractTokenFromHeader(req: Request): Promise<string> {
        const [type, token] = req.headers['auth']?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }

    private async verifyToken(req: Request): Promise<boolean> {
        const token: string = await this.extractTokenFromHeader(req);

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