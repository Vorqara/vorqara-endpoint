import {
  Injectable,
  ConflictException,
  Logger,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  private readonly logger = new Logger(OrganizationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    // Check whether the slug already exists
    const existingSlug = await this.prisma.organization.findUnique({
      where: {
        slug: createOrganizationDto.slug,
      },
    });

    if (existingSlug) {
      throw new ConflictException(
        'Organization slug already exists.',
      );
    }

    // Check whether the email already exists
    if (createOrganizationDto.email) {
      const existingEmail = await this.prisma.organization.findFirst({
        where: {
          email: createOrganizationDto.email,
        },
      });

      if (existingEmail) {
        throw new ConflictException(
          'Organization email already exists.',
        );
      }
    }

    // Create the organization
    const organization = await this.prisma.organization.create({
      data: createOrganizationDto,
    });

    this.logger.log(
      `Organization created: ${organization.name}`,
    );

    return organization;
  }

  async findAll() {
    return this.prisma.organization.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}