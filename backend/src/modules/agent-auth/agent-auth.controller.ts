import { Body, Controller, Post } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AgentAuthService } from './agent-auth.service';
import { AgentLoginDto } from './dto/agent-login.dto';

@ApiTags('Agent Authentication')
@Controller('agent-auth')
export class AgentAuthController {
  constructor(
    private readonly agentAuthService: AgentAuthService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Authenticate endpoint agent',
  })
  login(
    @Body()
    dto: AgentLoginDto,
  ) {
    return this.agentAuthService.login(dto);
  }
}