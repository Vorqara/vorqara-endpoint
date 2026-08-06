import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CalculateHealthDto {
  @ApiProperty({ example: 25 })
  @IsNumber()
  cpuUsage: number;

  @ApiProperty({ example: 48 })
  @IsNumber()
  memoryUsage: number;

  @ApiProperty({ example: 61 })
  @IsNumber()
  diskUsage: number;

  @ApiProperty({ example: 7200 })
  @IsNumber()
  uptimeSeconds: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  defenderEnabled: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  firewallEnabled: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  bitlockerEnabled: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  secureBootEnabled: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  tpmEnabled: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  agentRunning: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  networkConnected: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  pendingRestart: boolean;
}