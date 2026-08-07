import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  EndpointStatus,
  Prisma,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { HeartbeatDto } from './dto/heartbeat.dto';

@Injectable()
export class EndpointsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: CreateEndpointDto) {
    return this.prisma.endpoint.create({
      data: {
        hostname: dto.hostname,
        deviceName: dto.deviceName,
        operatingSystem: dto.operatingSystem,
        osVersion: dto.osVersion,
        agentVersion: dto.agentVersion,
        serialNumber: dto.serialNumber,
        ipAddress: dto.ipAddress,
        macAddress: dto.macAddress,
        username: dto.username,
        status:
          dto.status ?? EndpointStatus.ONLINE,
        lastSeenAt: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.endpoint.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const endpoint =
      await this.prisma.endpoint.findUnique({
        where: {
          id,
        },
      });

    if (!endpoint) {
      throw new NotFoundException(
        'Endpoint not found.',
      );
    }

    return endpoint;
  }

  async update(
    id: string,
    dto: UpdateEndpointDto,
  ) {
    await this.findOne(id);

    return this.prisma.endpoint.update({
      where: {
        id,
      },
      data: dto as Prisma.EndpointUpdateInput,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.endpoint.delete({
      where: {
        id,
      },
    });
  }

  async heartbeat(
    id: string,
    dto: HeartbeatDto,
  ) {
    await this.findOne(id);

    return this.prisma.endpoint.update({
      where: {
        id,
      },
      data: {
        ipAddress: dto.ipAddress,
        agentVersion: dto.agentVersion,
        username: dto.username,
        status: EndpointStatus.ONLINE,
        lastSeenAt: new Date(),
      },
    });
  }

  async isolate(id: string) {
    await this.findOne(id);

    return this.prisma.endpoint.update({
      where: {
        id,
      },
      data: {
        status: EndpointStatus.ISOLATED,
      },
    });
  }

  async restore(id: string) {
    await this.findOne(id);

    return this.prisma.endpoint.update({
      where: {
        id,
      },
      data: {
        status: EndpointStatus.ONLINE,
      },
    });
  }

  // ----------------------------------------
  // Dashboard Summary
  // ----------------------------------------

  async dashboardSummary() {
    const totalEndpoints =
      await this.prisma.endpoint.count();

    const onlineEndpoints =
      await this.prisma.endpoint.count({
        where: {
          status: EndpointStatus.ONLINE,
        },
      });

    const offlineEndpoints =
      await this.prisma.endpoint.count({
        where: {
          status: EndpointStatus.OFFLINE,
        },
      });

    const isolatedEndpoints =
      await this.prisma.endpoint.count({
        where: {
          status: EndpointStatus.ISOLATED,
        },
      });

    const quarantinedEndpoints =
      await this.prisma.endpoint.count({
        where: {
          status: EndpointStatus.QUARANTINED,
        },
      });

    const retiredEndpoints =
      await this.prisma.endpoint.count({
        where: {
          status: EndpointStatus.RETIRED,
        },
      });

    return {
      totalEndpoints,
      onlineEndpoints,
      offlineEndpoints,
      isolatedEndpoints,
      quarantinedEndpoints,
      retiredEndpoints,
    };
  }
}