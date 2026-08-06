import { Injectable } from '@nestjs/common';

import { CalculateHealthDto } from './dto/calculate-health.dto';

import {
  Finding,
  Recommendation,
} from './recommendation.types';

@Injectable()
export class HealthIntelligenceService {
  calculateHealth(input: CalculateHealthDto) {
    let healthScore = 100;
    let securityScore = 100;

    const findings: Finding[] = [];
    const recommendations: Recommendation[] = [];

    /*
     * -----------------------------
     * HEALTH
     * -----------------------------
     */

    if (input.cpuUsage > 90) {
      healthScore -= 20;

      findings.push({
        severity: 'HIGH',
        title: 'High CPU Usage',
        description: 'CPU utilization exceeds 90%.',
      });

      recommendations.push({
        priority: 3,
        title: 'Investigate CPU Usage',
        description:
          'Identify applications consuming excessive CPU resources.',
        estimatedTime: '15 minutes',
        businessImpact:
          'Improves endpoint responsiveness and user productivity.',
      });
    } else if (input.cpuUsage > 75) {
      healthScore -= 10;

      findings.push({
        severity: 'MEDIUM',
        title: 'Elevated CPU Usage',
        description: 'CPU utilization is above 75%.',
      });
    }

    if (input.memoryUsage > 90) {
      healthScore -= 20;

      findings.push({
        severity: 'HIGH',
        title: 'High Memory Usage',
        description: 'Memory utilization exceeds 90%.',
      });

      recommendations.push({
        priority: 3,
        title: 'Reduce Memory Usage',
        description:
          'Close unnecessary applications or increase available memory.',
        estimatedTime: '15 minutes',
        businessImpact:
          'Improves application stability and endpoint performance.',
      });
    } else if (input.memoryUsage > 75) {
      healthScore -= 10;

      findings.push({
        severity: 'MEDIUM',
        title: 'Elevated Memory Usage',
        description: 'Memory utilization is above 75%.',
      });
    }

    if (input.diskUsage > 95) {
      healthScore -= 20;

      findings.push({
        severity: 'HIGH',
        title: 'Disk Almost Full',
        description: 'Disk utilization exceeds 95%.',
      });

      recommendations.push({
        priority: 3,
        title: 'Free Disk Space',
        description:
          'Delete unused files or increase available storage.',
        estimatedTime: '20 minutes',
        businessImpact:
          'Prevents application failures caused by insufficient storage.',
      });
    } else if (input.diskUsage > 80) {
      healthScore -= 10;

      findings.push({
        severity: 'MEDIUM',
        title: 'Disk Usage High',
        description: 'Disk utilization exceeds 80%.',
      });
    }

    if (!input.agentRunning) {
      healthScore -= 20;
      securityScore -= 5;

      findings.push({
        severity: 'CRITICAL',
        title: 'Agent Offline',
        description: 'Vorqara Endpoint Agent is not running.',
      });

      recommendations.push({
        priority: 1,
        title: 'Restart Vorqara Agent',
        description:
          'Restart the Vorqara Endpoint Agent service immediately.',
        estimatedTime: '2 minutes',
        businessImpact:
          'Restores endpoint visibility and monitoring.',
      });
    }

    if (!input.networkConnected) {
      healthScore -= 10;

      findings.push({
        severity: 'MEDIUM',
        title: 'Network Disconnected',
        description: 'Endpoint is disconnected from the network.',
      });

      recommendations.push({
        priority: 2,
        title: 'Restore Network Connectivity',
        description:
          'Reconnect the endpoint to the corporate network.',
        estimatedTime: '5 minutes',
        businessImpact:
          'Allows monitoring, policy updates and remote management.',
      });
    }

    if (input.pendingRestart) {
      healthScore -= 10;

      findings.push({
        severity: 'LOW',
        title: 'Restart Required',
        description: 'System restart is pending.',
      });

      recommendations.push({
        priority: 4,
        title: 'Restart Endpoint',
        description:
          'Restart the endpoint to complete pending updates.',
        estimatedTime: '5 minutes',
        businessImpact:
          'Ensures updates and security patches are fully applied.',
      });
    }

    /*
     * -----------------------------
     * SECURITY
     * -----------------------------
     */

    if (!input.defenderEnabled) {
      securityScore -= 25;

      findings.push({
        severity: 'HIGH',
        title: 'Microsoft Defender Disabled',
        description: 'Endpoint antivirus protection is disabled.',
      });

      recommendations.push({
        priority: 1,
        title: 'Enable Microsoft Defender',
        description:
          'Enable real-time antivirus protection.',
        estimatedTime: '2 minutes',
        businessImpact:
          'Protects against malware, ransomware and malicious software.',
      });
    }

    if (!input.firewallEnabled) {
      securityScore -= 20;

      findings.push({
        severity: 'HIGH',
        title: 'Firewall Disabled',
        description: 'Windows Firewall is turned off.',
      });

      recommendations.push({
        priority: 1,
        title: 'Enable Windows Firewall',
        description:
          'Enable Windows Firewall on all network profiles.',
        estimatedTime: '2 minutes',
        businessImpact:
          'Blocks unauthorized inbound network traffic.',
      });
    }

    if (!input.bitlockerEnabled) {
      securityScore -= 20;

      findings.push({
        severity: 'HIGH',
        title: 'BitLocker Disabled',
        description: 'Disk encryption is not enabled.',
      });

      recommendations.push({
        priority: 1,
        title: 'Enable BitLocker',
        description:
          'Encrypt the operating system drive using BitLocker.',
        estimatedTime: '5-10 minutes',
        businessImpact:
          'Protects company data if the device is lost or stolen.',
      });
    }

    if (!input.secureBootEnabled) {
      securityScore -= 15;

      findings.push({
        severity: 'MEDIUM',
        title: 'Secure Boot Disabled',
        description: 'Secure Boot is not enabled.',
      });

      recommendations.push({
        priority: 2,
        title: 'Enable Secure Boot',
        description:
          'Enable Secure Boot in BIOS/UEFI.',
        estimatedTime: '10 minutes',
        businessImpact:
          'Protects the boot process from unauthorized software.',
      });
    }

    if (!input.tpmEnabled) {
      securityScore -= 15;

      findings.push({
        severity: 'MEDIUM',
        title: 'TPM Not Available',
        description: 'Trusted Platform Module is unavailable.',
      });

      recommendations.push({
        priority: 2,
        title: 'Enable TPM',
        description:
          'Enable TPM in BIOS/UEFI.',
        estimatedTime: '10 minutes',
        businessImpact:
          'Supports secure authentication and disk encryption.',
      });
    }

    /*
     * FINAL SCORE
     */

    healthScore = Math.max(0, healthScore);
    securityScore = Math.max(0, securityScore);

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';

    if (securityScore < 50) {
      riskLevel = 'CRITICAL';
    } else if (securityScore < 70) {
      riskLevel = 'HIGH';
    } else if (securityScore < 85) {
      riskLevel = 'MEDIUM';
    }

    recommendations.sort((a, b) => a.priority - b.priority);

    return {
      healthScore,
      securityScore,
      riskLevel,
      findings,
      recommendations,
    };
  }
}