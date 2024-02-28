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

    private async checkCredentials(password: string, credentials: User): Promise<boolean> {
        const match: boolean = await bcrypt.compare(password, credentials.password);

        if (match) return match;

        return false;
    }

    private async generateJwt(credentials: User): Promise<string> {
        const payload: PayloadTokenI = {
            sub: credentials.id,
            role: credentials.role
        };
        const accesToken: string = await this.getAccessToken(payload);

        return accesToken;
    }

    public async login(password: string, userName?: string, email?: string): Promise<string> {
        let credentials: User;

        if (userName) credentials = await this.userService.findUserBy({ key: 'userName', value: userName });
        if (email) credentials = await this.userService.findUserBy({ key: 'email', value: email });

        const isChecked: boolean = await this.checkCredentials(password, credentials);

        if (!isChecked) throw new HttpException('This credentials are wrong, check again', HttpStatus.UNAUTHORIZED);

        return await this.generateJwt(credentials);
    }

    public async verifyToken(token: string): Promise<unknown> {
        return await this.jwt.verifyAsync(token, {secret: this.config.get('JWT_SECRET')});
    }
}
