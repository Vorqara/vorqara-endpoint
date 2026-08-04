import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'users.read',
    description: 'Unique permission name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: 'Allows viewing users',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}