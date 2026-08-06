import { Injectable } from '@nestjs/common';

import { CalculateHealthDto } from './dto/calculate-health.dto';

@Injectable()
export class HealthIntelligenceService {
  calculateHealth(input: CalculateHealthDto) {
    let healthScore = 100;
    let securityScore = 100;

    /*
     * HEALTH SCORE
     */

    if (input.cpuUsage > 90) {
      healthScore -= 20;
    } else if (input.cpuUsage > 75) {
      healthScore -= 10;
    }

    if (input.memoryUsage > 90) {
      healthScore -= 20;
    } else if (input.memoryUsage > 75) {
      healthScore -= 10;
    }

    if (input.diskUsage > 95) {
      healthScore -= 20;
    } else if (input.diskUsage > 80) {
      healthScore -= 10;
    }

    if (!input.agentRunning) {
      healthScore -= 20;
    }

    if (!input.networkConnected) {
      healthScore -= 10;
    }

    if (input.pendingRestart) {
      healthScore -= 10;
    }

    /*
     * SECURITY SCORE
     */

    if (!input.defenderEnabled) {
      securityScore -= 25;
    }

    if (!input.firewallEnabled) {
      securityScore -= 20;
    }

    if (!input.bitlockerEnabled) {
      securityScore -= 20;
    }

    if (!input.tpmEnabled) {
      securityScore -= 15;
    }

    if (!input.secureBootEnabled) {
      securityScore -= 15;
    }

    if (!input.agentRunning) {
      securityScore -= 5;
    }

    healthScore = Math.max(0, healthScore);
    securityScore = Math.max(0, securityScore);

    let riskLevel = 'LOW';

    if (securityScore < 50) {
      riskLevel = 'CRITICAL';
    } else if (securityScore < 70) {
      riskLevel = 'HIGH';
    } else if (securityScore < 85) {
      riskLevel = 'MEDIUM';
    }

    return {
      healthScore,
      securityScore,
      riskLevel,
    };
  }
}