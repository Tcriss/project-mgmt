import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

export class AuthGuard implements CanActivate {

    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        private reflector: Reflector
    ) {}

    private async extractTokenFromHeader(request: Request): Promise<string | undefined> {
        const [type, token] = request.headers['authorization']?.split('') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
    
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(), 
            context.getClass()
        ]); 

        if (isPublic) return true;

        const request: Request = context.switchToHttp().getRequest();
        const token = await this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException('Invalid token');
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: this.config.get('secret')});
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}