import { IsBoolean, IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class CommandResultDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @IsObject()
  output?: any;

  @IsOptional()
  @IsString()
  error?: string;

  @IsOptional()
  @IsInt()
  exitCode?: number;
}