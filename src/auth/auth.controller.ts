import { Body, Controller, Post, Get, Options } from '@nestjs/common';

import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {

    
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      username: user.username,
      admin: user.admin,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      username: user.username,
      admin: user.admin,
      expiresIn : "43200"
    };
    const token = await this.authService.signPayload(payload);
     
    return { user, token, };
  }
}