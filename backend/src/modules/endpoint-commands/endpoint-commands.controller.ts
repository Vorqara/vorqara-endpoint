import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { AgentJwtGuard } from '../../common/guards/agent-jwt.guard';

import { EndpointCommandsService } from './endpoint-commands.service';
import { CommandResultDto } from './dto/command-result.dto';

@ApiTags('Endpoint Commands')
@ApiBearerAuth()
@Controller('endpoint-commands')
export class EndpointCommandsController {
  constructor(
    private readonly endpointCommandsService: EndpointCommandsService,
  ) {}

  // ------------------------------------------------
  // Dashboard queues command
  // ------------------------------------------------

  @Post(':endpointId')
  async queue(
    @Param('endpointId') endpointId: string,
    @Body()
    body: {
      command: string;
      payload?: any;
    },
  ) {
    return this.endpointCommandsService.queueCommand(
      endpointId,
      body.command,
      body.payload,
    );
  }

  // ------------------------------------------------
  // Agent fetches pending commands
  // ------------------------------------------------

  @UseGuards(AgentJwtGuard)
  @Get(':endpointId/pending')
  async pending(
    @Param('endpointId')
    endpointId: string,
  ) {
    return this.endpointCommandsService.getPendingCommands(
      endpointId,
    );
  }

  // ------------------------------------------------
  // Agent marks command running
  // ------------------------------------------------

  @UseGuards(AgentJwtGuard)
  @Patch(':commandId/running')
  async running(
    @Param('commandId')
    commandId: string,
  ) {
    return this.endpointCommandsService.markRunning(
      commandId,
    );
  }

  // ------------------------------------------------
  // Agent submits result
  // ------------------------------------------------

  @UseGuards(AgentJwtGuard)
  @Post(':commandId/result')
  async result(
    @Param('commandId')
    commandId: string,

    @Body()
    body: CommandResultDto,
  ) {
    return this.endpointCommandsService.saveCommandResult(
      commandId,
      body,
    );
  }

  // ------------------------------------------------
  // Dashboard gets command details
  // ------------------------------------------------

  @Get('command/:commandId')
  async command(
    @Param('commandId')
    commandId: string,
  ) {
    return this.endpointCommandsService.getCommand(
      commandId,
    );
  }
}