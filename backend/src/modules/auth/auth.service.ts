import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(
      registerDto,
    );

    const permissions =
      await this.usersService.getUserPermissions(
        user.id,
      );

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions,
    };

    return {
      accessToken:
        await this.jwtService.signAsync(payload),
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const user =
      await this.usersService.findByEmail(
        loginDto.email,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password.',
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        loginDto.password,
        user.passwordHash,
      );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid email or password.',
      );
    }

    const permissions =
      await this.usersService.getUserPermissions(
        user.id,
      );

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions,
    };

    return {
      accessToken:
        await this.jwtService.signAsync(payload),
      user,
    };
  }

  async getProfile(userId: string) {
    const user =
      await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}