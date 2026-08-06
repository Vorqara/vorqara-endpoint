import { Injectable } from '@nestjs/common';
import { CommandStatus } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { CommandResultDto } from './dto/command-result.dto';

@Injectable()
export class EndpointCommandsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ------------------------------------------------
  // Queue Command
  // ------------------------------------------------

  async queueCommand(
    endpointId: string,
    command: string,
    payload?: any,
  ) {
    return this.prisma.endpointCommand.create({
      data: {
        endpointId,
        command,
        payload,
      },
    });
  }

  // ------------------------------------------------
  // Pending Commands
  // ------------------------------------------------

  async getPendingCommands(
    endpointId: string,
  ) {
    return this.prisma.endpointCommand.findMany({
      where: {
        endpointId,
        status: CommandStatus.PENDING,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  // ------------------------------------------------
  // Running
  // ------------------------------------------------

  async markRunning(
    commandId: string,
  ) {
    return this.prisma.endpointCommand.update({
      where: {
        id: commandId,
      },
      data: {
        status: CommandStatus.RUNNING,
      },
    });
  }

  // ------------------------------------------------
  // Save Result
  // ------------------------------------------------

  async saveCommandResult(
    commandId: string,
    result: CommandResultDto,
  ) {
    return this.prisma.endpointCommand.update({
      where: {
        id: commandId,
      },
      data: {
        status: result.success
          ? CommandStatus.COMPLETED
          : CommandStatus.FAILED,

        output: result.output,

        error: result.error,

        exitCode: result.exitCode,

        executedAt: new Date(),
      },
    });
  }

  // ------------------------------------------------
  // Single Command
  // ------------------------------------------------

  async getCommand(
    commandId: string,
  ) {
    return this.prisma.endpointCommand.findUnique({
      where: {
        id: commandId,
      },
    });
  }
}