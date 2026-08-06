import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class EndpointHealthService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async upsertHealth(
    endpointId: string,
    data: {
      cpuUsage: number;
      memoryUsage: number;
      diskUsage: number;
      uptimeSeconds: bigint | number;

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
    return this.prisma.endpointHealth.upsert({
      where: {
        endpointId,
      },

      create: {
        endpointId,

        cpuUsage: data.cpuUsage,
        memoryUsage: data.memoryUsage,
        diskUsage: data.diskUsage,
        uptimeSeconds: BigInt(data.uptimeSeconds),

        defenderEnabled: data.defenderEnabled,
        firewallEnabled: data.firewallEnabled,
        bitLockerEnabled: data.bitLockerEnabled,
        secureBootEnabled: data.secureBootEnabled,
        tpmEnabled: data.tpmEnabled,

        agentRunning: data.agentRunning,
        networkConnected: data.networkConnected,
        pendingRestart: data.pendingRestart,

        healthScore: 100,
        securityScore: 100,
        riskScore: 0,

        lastCollected: new Date(),
      },

      update: {
        cpuUsage: data.cpuUsage,
        memoryUsage: data.memoryUsage,
        diskUsage: data.diskUsage,
        uptimeSeconds: BigInt(data.uptimeSeconds),

        defenderEnabled: data.defenderEnabled,
        firewallEnabled: data.firewallEnabled,
        bitLockerEnabled: data.bitLockerEnabled,
        secureBootEnabled: data.secureBootEnabled,
        tpmEnabled: data.tpmEnabled,

        agentRunning: data.agentRunning,
        networkConnected: data.networkConnected,
        pendingRestart: data.pendingRestart,

        lastCollected: new Date(),
      },
    });
  }

  async getHealth(endpointId: string) {
    return this.prisma.endpointHealth.findUnique({
      where: {
        endpointId,
      },
    });
  }

  async getAllHealth() {
    return this.prisma.endpointHealth.findMany({
      include: {
        endpoint: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
}