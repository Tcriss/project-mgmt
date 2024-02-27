import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PayloadTokenI } from 'src/common/interfaces';
import { User } from 'src/modules/user/entities';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwt: JwtService,
        private userService: UserService,
        private config: ConfigService
    ) { }

    private async getAccessToken(payload: {sub: string, role: string}): Promise<string> {
        return await this.jwt.signAsync(payload);
    }

    private async checkCredentials(user: User, password: string, userName?: string, email?: string): Promise<boolean> {
        if (userName) {
            const getUsername: User = await this.userService.findUserBy({ key: 'userName', value: userName });

            if (user.id != getUsername.id) throw new HttpException("User id and email/username doesn't match", HttpStatus.BAD_REQUEST);

            const match = await bcrypt.compare(password, getUsername.password);

            if (match) return match;
        };

        if (email) {
            const getEmail: User = await this.userService.findUserBy({ key: 'email', value: email });

            if (user.id != getEmail.id) throw new HttpException("User id and email/username doesn't match", HttpStatus.BAD_REQUEST);

            const match = await bcrypt.compare(password, getEmail.password);

            if (match) return match;
        };

        return false;
    }

    public async generateJwt(userId: string, password: string, userName?: string, email?: string,): Promise<unknown> {
        const user: User = await this.userService.findOneUser(userId);
        const checking: boolean = await this.checkCredentials(user, password, userName, email);

        if (checking) {
            const payload: PayloadTokenI = {
                sub: user.id,
                role: user.role
            };

            return {
                accesToken: await this.getAccessToken(payload),
                user: user
            };
        };

        throw new HttpException("Check your credentials", HttpStatus.UNAUTHORIZED);
    }

    public async verifyToken(token: string): Promise<unknown> {
        return await this.jwt.verifyAsync(token, {secret: this.config.get('JWT_SECRET')});
    }
}
