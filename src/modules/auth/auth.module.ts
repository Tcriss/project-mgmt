import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities';
import { JwtProvider } from './providers/jwt.provider';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtProvider,
    UserModule
  ],
  exports: [JwtProvider]
})
export class AuthModule {}