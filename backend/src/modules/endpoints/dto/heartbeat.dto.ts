import {
  IsIP,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class HeartbeatDto {
  @ApiProperty({
    example: '192.168.1.10',
    required: false,
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;

  @ApiProperty({
    example: 'Stephen',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: '1.0.0',
    required: false,
  })
  @IsOptional()
  @IsString()
  agentVersion?: string;
}