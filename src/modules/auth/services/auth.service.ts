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
        private readonly userService: UserService,
        private readonly config: ConfigService
    ) { }

    private async getAccessToken(payload: {sub: string, role: string}): Promise<string> {
        return await this.jwt.signAsync(payload);;
    }

    private async checkCredentials(password: string, userName?: string, email?: string): Promise<boolean> {
        const getUsername: User = await this.userService.findUserBy({ key: 'userName', value: userName });
        const getEmail: User = await this.userService.findUserBy({ key: 'email', value: email });

        if (getUsername) {
            const match = await bcrypt.compare(password, getUsername.password);
            if (match) return match;
        };
        if (getEmail) {
            const match = await bcrypt.compare(password, getEmail.password);
            if (match) return match;
        };

        return false;
    }

    public async generateJwt(userId: string, password: string, userName?: string, email?: string,): Promise<unknown> {
        const checking: boolean = await this.checkCredentials(password, userName, email);

        if (checking) {
            const user: User = await this.userService.findOneUser(userId);
            const payload: PayloadTokenI = {
                sub: user.id,
                role: user.role
            };

            return {
                accesToken: await this.getAccessToken(payload),
                user: user
            };
        };
        if (!checking) throw new HttpException("Check your credentials", HttpStatus.UNAUTHORIZED);
    }
}
