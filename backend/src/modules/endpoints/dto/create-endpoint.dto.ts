import {
  IsEnum,
  IsIP,
  IsMACAddress,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import {
  EndpointStatus,
  OperatingSystem,
} from '@prisma/client';

export class CreateEndpointDto {
  @ApiProperty({
    example: 'WIN-8A1B2C3D',
  })
  @IsString()
  hostname: string;

  @ApiProperty({
    example: 'Stephen Laptop',
    required: false,
  })
  @IsOptional()
  @IsString()
  deviceName?: string;

  @ApiProperty({
    enum: OperatingSystem,
    example: OperatingSystem.WINDOWS,
  })
  @IsEnum(OperatingSystem)
  operatingSystem: OperatingSystem;

  @ApiProperty({
    example: 'Windows 11 Pro 24H2',
    required: false,
  })
  @IsOptional()
  @IsString()
  osVersion?: string;

  @ApiProperty({
    example: '1.0.0',
    required: false,
  })
  @IsOptional()
  @IsString()
  agentVersion?: string;

  @ApiProperty({
    example: 'ABC123XYZ987',
    required: false,
  })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiProperty({
    example: '192.168.1.10',
    required: false,
  })
  @IsOptional()
  @IsIP()
  ipAddress?: string;

  @ApiProperty({
    example: '00:1A:2B:3C:4D:5E',
    required: false,
  })
  @IsOptional()
  @IsMACAddress()
  macAddress?: string;

  @ApiProperty({
    example: 'Stephen',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    enum: EndpointStatus,
    required: false,
    example: EndpointStatus.ONLINE,
  })
  @IsOptional()
  @IsEnum(EndpointStatus)
  status?: EndpointStatus;
}