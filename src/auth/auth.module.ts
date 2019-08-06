import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[SharedModule],
  controllers:[AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
