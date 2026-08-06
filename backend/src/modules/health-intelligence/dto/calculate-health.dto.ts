import { ApiProperty } from '@nestjs/swagger';

export class CalculateHealthDto {
  @ApiProperty({
    example: 25,
  })
  cpuUsage: number;

  @ApiProperty({
    example: 48,
  })
  memoryUsage: number;

  @ApiProperty({
    example: 61,
  })
  diskUsage: number;

  @ApiProperty({
    example: 7200,
  })
  uptimeSeconds: number;

  @ApiProperty({
    example: true,
  })
  defenderEnabled: boolean;

  @ApiProperty({
    example: true,
  })
  firewallEnabled: boolean;

  @ApiProperty({
    example: false,
  })
  bitlockerEnabled: boolean;

  @ApiProperty({
    example: true,
  })
  secureBootEnabled: boolean;

  @ApiProperty({
    example: true,
  })
  tpmEnabled: boolean;

  @ApiProperty({
    example: true,
  })
  agentRunning: boolean;

  @ApiProperty({
    example: true,
  })
  networkConnected: boolean;

  @ApiProperty({
    example: false,
  })
  pendingRestart: boolean;
}