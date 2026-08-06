import { IsString } from 'class-validator';

export class AgentLoginDto {
  @IsString()
  registrationKey: string;

  @IsString()
  hostname: string;

  @IsString()
  operatingSystem: string;

  @IsString()
  agentVersion: string;
}