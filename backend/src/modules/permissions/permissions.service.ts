import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreatePermissionDto,
  ) {
    const exists =
      await this.prisma.permission.findUnique({
        where: {
          name: dto.name,
        },
      });

    if (exists) {
      throw new ConflictException(
        'Permission already exists.',
      );
    }

    return this.prisma.permission.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.permission.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const permission =
      await this.prisma.permission.findUnique({
        where: {
          id,
        },
      });

    if (!permission) {
      throw new NotFoundException(
        'Permission not found.',
      );
    }

    return permission;
  }

  async update(
    id: string,
    dto: UpdatePermissionDto,
  ) {
    await this.findOne(id);

    return this.prisma.permission.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.permission.delete({
      where: {
        id,
      },
    });
  }
}