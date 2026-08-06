import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AgentLoginDto } from './dto/agent-login.dto';

@Injectable()
export class AgentAuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AgentLoginDto) {
    const expectedRegistrationKey =
      process.env.AGENT_REGISTRATION_KEY || 'vorqara-agent-dev';

    if (dto.registrationKey !== expectedRegistrationKey) {
      throw new UnauthorizedException('Invalid registration key');
    }

    const payload = {
      type: 'agent',
      hostname: dto.hostname,
      operatingSystem: dto.operatingSystem,
      agentVersion: dto.agentVersion,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: '30d',
    };
  }
}