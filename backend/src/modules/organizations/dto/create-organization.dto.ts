import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    example: 'Vorqara Technologies',
  })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({
    example: 'vorqara',
  })
  @IsString()
  @Length(2, 50)
  slug: string;

  @ApiProperty({
    example: 'Enterprise Endpoint Protection Platform',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'https://vorqara.com',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    example: 'info@vorqara.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+2348000000000',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'Nigeria',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Africa/Lagos',
  })
  @IsString()
  timezone: string;
}