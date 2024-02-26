import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  providers: [
    AuthService, 
    {
      provide: APP_GUARD, 
      useClass: AuthGuard
    },
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]), 
    JwtModule.register({
      global: true,
      secret: AuthModule.secret,
      signOptions: {
        expiresIn: 60,
        algorithm: 'HS256'
      }
    }),
    UserModule
  ]
})
export class AuthModule {

  static secret: string;

  constructor(private readonly config: ConfigService) {
    AuthModule.secret = this.config.get('JWT_SECRET');
  }
}
