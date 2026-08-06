import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AgentJwtGuard } from '../../common/guards/agent-jwt.guard';

import { EndpointHealthService } from './endpoint-health.service';

@ApiTags('Endpoint Health')
@ApiBearerAuth()
@Controller('endpoint-health')
export class EndpointHealthController {
  constructor(
    private readonly endpointHealthService: EndpointHealthService,
  ) {}

  @UseGuards(AgentJwtGuard)
  @Post(':endpointId')
  async submitHealth(
    @Param('endpointId')
    endpointId: string,

    @Body()
    body: {
      cpuUsage: number;
      memoryUsage: number;
      diskUsage: number;
      uptimeSeconds: number;

      defenderEnabled: boolean;
      firewallEnabled: boolean;
      bitLockerEnabled: boolean;
      secureBootEnabled: boolean;
      tpmEnabled: boolean;

      agentRunning: boolean;
      networkConnected: boolean;
      pendingRestart: boolean;
    },
  ) {
    return this.endpointHealthService.upsertHealth(
      endpointId,
      body,
    );
  }

  @Get(':endpointId')
  async getHealth(
    @Param('endpointId')
    endpointId: string,
  ) {
    return this.endpointHealthService.getHealth(
      endpointId,
    );
  }

  @Get()
  async getAllHealth() {
    return this.endpointHealthService.getAllHealth();
  }
}